import {
    extendZodWithOpenApi,
    OpenAPIRegistry,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
import { CreateProductsSchema, ListProductSchema } from "./schemas";
import { AuthorizationHeaderSchema } from "../shared-schemas";

extendZodWithOpenApi(z);

export const injectProductsControllerInSwagger = (
    registry: OpenAPIRegistry
) => {
    registry.registerPath({
        method: "post",
        path: "/products",
        tags: ["Products controller"],
        responses: {},
        request: {
            headers: AuthorizationHeaderSchema,
            body: {
                content: {
                    "application/json": { schema: CreateProductsSchema },
                },
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/products",
        tags: ["Products controller"],
        responses: {
            "200": {
                content: { "application/json": { schema: ListProductSchema } },
                description: "List of all products",
            },
        },
        request: {
            headers: AuthorizationHeaderSchema,
        },
    });
};
