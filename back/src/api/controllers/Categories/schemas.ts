import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Parameter } from "../../../contracts";
import { ICategoriesRepository } from "../../../db/sqlite3/entities";
import { IdSchema } from "../shared-schemas";
import { z, ZodError } from "zod";

extendZodWithOpenApi(z);

export const GetCategoryByIdRequestSchema = IdSchema;
export const ModifyCategoryByIdQueryRequestSchema = IdSchema;
export const ModifyCategoryByIdQueryBodySchema = z.object({
    name: z.string().openapi({ example: "Electronics" }),
});

export const CategorySchema = z.object({
    id: z.number(),
    name: z.string().openapi({ example: "Foods" }),
});
export const CategoriesSchema = z.array(CategorySchema);

export const CreateCategoriesSchema = z.array(
    z.object({
        name: z.string().openapi({ description: "Foods" }),
    })
);

export type GetCategoryById = {
    Request: z.infer<typeof GetCategoryByIdRequestSchema>;
    Response: z.infer<typeof CategorySchema> | ZodError;
};

export type GetAllCategories = {
    Response: z.infer<typeof CategoriesSchema>;
};

export type ModifyCategoryById = {
    Request: {
        Query: z.infer<typeof ModifyCategoryByIdQueryRequestSchema>;
        Body: z.infer<typeof ModifyCategoryByIdQueryBodySchema>;
    };
};

export type CreateCategory = {
    Request: z.infer<typeof CreateCategoriesSchema>;
};
