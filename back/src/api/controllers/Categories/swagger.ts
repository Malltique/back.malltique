import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import {
    CategoriesSchema,
    CategorySchema,
    CreateCategoriesSchema,
    GetCategoryByIdRequestSchema,
} from "./schemas";
import { AuthorizationHeaderSchema } from "../shared-schemas";

export const injectCategoriesControllerInSwagger = (
    registry: OpenAPIRegistry
) => {
    registry.registerPath({
        method: "get",
        path: "/categories/{id}",
        tags: ["Categories controller"],
        request: {
            params: GetCategoryByIdRequestSchema,
            headers: AuthorizationHeaderSchema,
        },
        responses: {
            "200": {
                content: {
                    "application/json": { schema: CategorySchema },
                },
                description: "Get category by id",
            },
        },
    });

    registry.registerPath({
        method: "get",
        path: "/categories",
        tags: ["Categories controller"],
        request: {
            headers: AuthorizationHeaderSchema,
        },
        responses: {
            "200": {
                content: {
                    "application/json": { schema: CategoriesSchema },
                },
                description: "Get all categories",
            },
        },
    });

    registry.registerPath({
        method: "post",
        path: "/categories",
        tags: ["Categories controller"],
        request: {
            body: {
                content: {
                    "application/json": { schema: CreateCategoriesSchema },
                },
            },
            headers: AuthorizationHeaderSchema,
        },
        responses: {
            "200": {
                description: "Created category",
            },
        },
    });
};
