import { Express, Request, Response } from "express";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import { AllProducts } from "../../../db/sqlite3/entities/Products/repositories";
import { sqlite3Db } from "../../../db";
import { CreateProducts, GetAllProducts } from "./types";

const url = buildURL("products");

export const injectProductsController = (app: Express) => {
    app.post<{}, {}, CreateProducts["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const products = new AllProducts(sqlite3Db);
            await products.create(req.body);
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
};
