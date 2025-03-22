import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { AuthorizationHeaderSchema } from "../shared-schemas";
import {
    CreateOrderSchema,
    GetOrderByIdRequestSchema,
    OrderSchema,
} from "./schemas";

export const injectOrdersControllerInSwagger = (registry: OpenAPIRegistry) => {
    registry.registerPath({
        method: "post",
        path: "/orders",
        tags: ["Orders controller"],
        responses: {
            200: { description: "Order was created" },
        },
        request: {
            headers: AuthorizationHeaderSchema,
            body: {
                content: {
                    "application/json": {
                        schema: CreateOrderSchema,
                    },
                },
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/orders/{id}",
        tags: ["Orders controller"],
        request: {
            headers: AuthorizationHeaderSchema,
            params: GetOrderByIdRequestSchema,
        },
        responses: {
            200: {
                description: "Get order by id",
                content: {
                    "application/json": {
                        schema: OrderSchema,
                    },
                },
            },
        },
    });
};
