import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { AuthorizationHeaderSchema } from "../shared-schemas";
import { CreateRolesSchema, RolesSchema } from "./schemas";

export const injectRolesControllerInSwagger = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: "/roles",
        tags: ["Roles controller"],
        responses: {
            200: { description: "Role was created" },
            400: { description: "Wrong user input" },
        },
        request: {
            headers: AuthorizationHeaderSchema,
            body: {
                content: {
                    "application/json": { schema: CreateRolesSchema },
                },
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/roles",
        tags: ["Roles controller"],
        responses: {
            200: {
                description: "All roles list",
                content: {
                    "application/json": { schema: RolesSchema },
                },
            },
        },
        request: {
            headers: AuthorizationHeaderSchema,
        },
    });
};
