import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const RegisterRequestSchema = z
    .object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        roles: z.array(z.number()).openapi({
            description:
                "Identificators of roles will be given to created user",
        }),
    })
    .openapi("Registration payload");

export const LoginRequestSchema = z
    .object({
        email: z.string(),
        password: z.string(),
    })
    .openapi("Login payload");

export const LoginResponseSchema = z
    .object({
        token: z.string().openapi({
            description: "Encoded JWT token with user information",
        }),
        status: z.enum(["Success", "Wrong password", "Not registered user"]),
    })
    .openapi("Login response payload");

export type Register = {
    Request: z.infer<typeof RegisterRequestSchema>;
};

export type Login = {
    Request: z.infer<typeof LoginRequestSchema>;
    Response: z.infer<typeof LoginResponseSchema>;
};
