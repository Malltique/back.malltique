import { z } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";

extendZodWithOpenApi(z);

export const CreateProductsSchema = z
    .array(
        z.object({
            seller: z.number().openapi({
                description: "Product seller user identifier",
                example: 82,
            }),
            name: z
                .string()
                .openapi({ example: "Beatles - A Hard Day's Night (vinyl)" }),
            description: z.string().openapi({ example: "Original 1964 press" }),
            categories: z.array(z.number()).openapi({
                description: "Product category identifiers",
                example: [1, 3, 5],
            }),
        })
    )
    .openapi("Create product payload");

export const ListProductSchema = z.object({
    name: z
        .string()
        .openapi({ example: "Beatles - A Hard Day's Night (vinyl)" }),
    description: z.string().openapi({ example: "Original 1964 press" }),
    id: z.number().openapi({ example: 3 }),
});

export const DeleteProductsByIdsRequestSchema = z.object({
    ids: z.array(z.number()),
});

export type GetAllProducts = {
    Response: z.infer<typeof ListProductSchema>[];
};

export type CreateProducts = {
    Request: z.infer<typeof CreateProductsSchema>;
};

export type DeleteProductsByIds = {
    Request: z.infer<typeof DeleteProductsByIdsRequestSchema>;
};
