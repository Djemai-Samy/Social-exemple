
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../ui/Input";
import Error from "../ui/Error";
import Button from "../ui/Button";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { useNavigate } from "react-router";

const singinSchema = z.object({
    email: z.string({ required_error: "Email obligatoire" }).
        email({ message: "Email invalide !" }),
    password: z.string({ required_error: "Mot de passe obligatoire" }).
        min(6, { message: "Mot de passe trop court !" }),
})

export default function SigninForm() {

    const { handleSubmit, formState: { errors }, control } = useForm({ resolver: zodResolver(singinSchema) })

    const { user, signin } = useContext(UserContext);
    const [backEndreponse, setBackendReponse] = useState(null);

    const navigate = useNavigate();

    if (user) {
        return navigate('/profil');
    }
    async function submit(data) {
        const signinReponse = await signin(data);
        if (signinReponse.success) {
            return navigate('/profil');
        }
        setBackendReponse(signinReponse);
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="flex flex-col gap-2 max-w-lg m-auto justify-center items-center p-4 shadow-md">
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input {...field} autoComplete="email" type="email" placeholder='Email' ref={null} />)}
            />
            <Error>{errors.email?.message}</Error>

            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input {...field} autoComplete={"new-password"} type="password" placeholder='Mot de passe' ref={null} />)}
            />
            <Error>{errors.password?.message}</Error>

            <Button>Connexion</Button>
            {
                backEndreponse?.success ?
                    <p>{backEndreponse?.message}</p> :
                    <Error>{backEndreponse?.message}</Error>
            }
        </form>
    )
}
