
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../ui/Input";
import Error from "../ui/Error";
import Button from "../ui/Button";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";

const singinSchema = z.object({
    email: z.string({ required_error: "Email obligatoire" }).
        email({ message: "Email invalide !" }),
    password: z.string({ required_error: "Mot de passe obligatoire" }).
        min(6, { message: "Mot de passe trop court !" }),
})

export default function SigninForm() {

    const { register, handleSubmit, formState: { errors }, control } = useForm({ resolver: zodResolver(singinSchema) })

    const { signin } = useContext(UserContext);
    const [backEndreponse, setBackendReponse] = useState(null);

    async function submit(data) {
        const signinReponse = await signin(data);
        setBackendReponse(signinReponse);
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <Controller
                name="email"
                control={control}
                render={({ field }) => <Input {...field} type="email" placeholder='Email' />}
            />
            <Error>{errors.email?.message}</Error>

            <Controller
                name="password"
                control={control}
                render={({ field }) => <Input {...field} type="password" placeholder='Mot de passe' />}
            />
            <Error>{errors.password?.message}</Error>

            <Button>Connexion</Button>

            <Error>{backEndreponse ? backEndreponse.message : ""}</Error>
        </form>
    )
}
