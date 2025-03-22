import { z, ZodError } from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { IdSchema } from "../shared-schemas";
import { RoleSchema } from "../Roles/schemas";

extendZodWithOpenApi(z);

export const CreateOrderSchema = z.object({
    userId: z.number(),
    productsData: z.array(
        z.object({ productId: z.number(), quantity: z.number() })
    ),
});

export const GetOrderByIdRequestSchema = IdSchema;

export const OrderSchema = z.object({
    id: z.number(),
    buyer: z.object({
        name: z.string(),
        email: z.string(),
        id: z.number(),
        roles: z.array(RoleSchema),
    }),
    data: z.array(
        z.object({
            product: z.object({
                id: z.number(),
                name: z.string(),
                description: z.string(),
            }),
            quantity: z.number(),
        })
    ),
});

export type CreateOrder = { Request: z.infer<typeof CreateOrderSchema> };

export type GetOrder = {
    Request: z.infer<typeof GetOrderByIdRequestSchema>;
    Response: z.infer<typeof OrderSchema> | ZodError;
};
