import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

export const AuthorizationHeaderSchema = z
    .object({ auth: z.string().openapi({ description: "Signed JWT token" }) })
    .openapi("Authorization header payload");

export const IdSchema = z.object({ id: z.string() });
