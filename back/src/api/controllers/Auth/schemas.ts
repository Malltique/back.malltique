import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const ResisterRequestSchema = z
    .object({
        email: z.string().openapi({ description: "What is up my email" }),
        name: z.string(),
        password: z.string(),
        roles: z.array(z.number()),
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
    })
    .openapi("Login response");

export type Register = {
    Request: z.infer<typeof ResisterRequestSchema>;
};

export type Login = {
    Request: z.infer<typeof LoginRequestSchema>;
    Response: z.infer<typeof LoginResponseSchema>;
};
