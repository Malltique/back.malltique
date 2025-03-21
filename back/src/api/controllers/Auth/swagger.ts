import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
    LoginRequestSchema,
    LoginResponseSchema,
    ResisterRequestSchema,
} from "./schemas";

export const injectAuthControllerInSwagger = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: "/auth/register",
        tags: ["Auth controller"],
        description: "Method for new users registration",
        responses: {
            ["200"]: { description: "New user was registered" },
        },
        request: {
            body: {
                content: {
                    "application/json": {
                        schema: ResisterRequestSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/auth/login",
        tags: ["Auth controller"],
        responses: {
            "200": {
                content: {
                    "application/json": { schema: LoginResponseSchema },
                },
                description:
                    "User provided existing email and correct password",
            },
        },
        request: {
            body: {
                content: {
                    "application/json": { schema: LoginRequestSchema },
                },
            },
        },
    });
};
