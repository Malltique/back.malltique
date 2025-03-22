import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const CreateRolesSchema = z.array(
    z.object({ name: z.string().openapi({ example: "Admin" }) })
);

export const RoleSchema = z.object({
    id: z.number(),
    name: z.string().openapi({ example: "Admin" }),
});

export const RolesSchema = z.array(RoleSchema);

export type CreateRole = {
    Request: z.infer<typeof CreateRolesSchema>;
};

export type GetRoles = {
    Response: z.infer<typeof RolesSchema>;
};
