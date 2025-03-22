import { Express } from "express";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import {
    AllProducts,
    ProductsWithIds,
} from "../../../db/sqlite3/entities/Products/repositories";
import { sqlite3Db } from "../../../db";
import {
    CreateProductsSchema,
    CreateProducts,
    GetAllProducts,
    DeleteProductsByIds,
    DeleteProductsByIdsRequestSchema,
} from "./schemas";

const url = buildURL("products");

export const injectProductsController = (app: Express) => {
    app.post<{}, {}, CreateProducts["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const products = new AllProducts(sqlite3Db);
            const { success, data, error } = CreateProductsSchema.safeParse(
                req.body
            );
            if (!success) {
                res.status(400).json(error);
            }
            await products.create(data!);
            res.sendStatus(200);
        }
    );

    app.get<{}, GetAllProducts["Response"], {}>(
        url(),
        authMiddleware(SECRET_KEY),
        async (_, res) => {
            const products = new AllProducts(sqlite3Db);
            const model = await products.listModel();
            res.json(model);
        }
    );

    app.delete<{}, {}, DeleteProductsByIds["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { success, data, error } =
                DeleteProductsByIdsRequestSchema.safeParse(req.body);
            if (!success) {
                res.status(400).json(error);
                return;
            }

            const productsWithIds = new ProductsWithIds(sqlite3Db, data!.ids);
            try {
                await productsWithIds.deleteAll();
                res.status(200);
            } catch (e: any) {
                res.status(500).send(e);
            }
        }
    );
};
