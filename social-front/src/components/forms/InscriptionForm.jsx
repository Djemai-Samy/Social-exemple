
import { z } from "zod";
import { useForm, Form, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../ui/Input";
import Error from "../ui/Error";
import Button from "../ui/Button";

const registerSchema = z.object({
  email: z.string({ required_error: "Email obligatoire" }).
    email({ message: "Email invalide !" }),
  password: z.string({ required_error: "Mot de passe obligatoire obligatoire" }).
    min(6, { message: "Mot de passe trop court !" }),
  confirmPassword: z.string({ required_error: "Confirmez votre mot de passe" }).
    min(6, { message: "Mot de passe trop court !" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mot de passe ne sont pas identiques !",
  path: ['confirmPassword'],
});


export default function InscriptionForm() {
  const { formState: { errors }, control, reset } = useForm(
    { resolver: zodResolver(registerSchema) }
  );
  return (
    <Form action="/api/users/register"
      encType={'application/json'}
      onSuccess={() => {
        alert("Inscription réussie !");
        reset({ password: "", confirmPassword: "" })
      }}
      onError={() => {
        alert("Inscription échouée.")
      }}
      control={control}
      className="flex flex-col gap-2 max-w-lg m-auto justify-center items-center p-4 shadow-md"
    >
      <h2 className="text-3xl font-semibold p-4">Inscription</h2>
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

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => <Input {...field} type="password" placeholder='Confirmez votre mot de passe' />}
      />
      <Error>{errors.confirmPassword?.message}</Error>

      <Button type="submit">{"S'inscrire"}</Button>
    </Form>
  )
}
