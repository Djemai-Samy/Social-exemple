import { z } from "zod";

const registerSchema = z.object({
    email: z.string({ required_error: "EMAIL_REQUIRED", }).
        email({ message: "INVALID_EMAIL" }),
    password: z.string({ message: "PASSWORD_REQUIRED" }).
        min(6, { message: "PASSWORD_TOO_SHORT" })
});

export const registerValidation = (data) => {
    const validatedData = registerSchema.safeParse(data);
    return validatedData;
}