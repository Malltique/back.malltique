import { Application, Request, Response } from "express";
import { sqlite3Db, SQLite3Entities } from "../../../db";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import {
    CreateCategory,
    GetAllCategories,
    GetCategoryById,
    ModifyCategoryById,
} from "./types";

const url = buildURL("categories");

export const injectCategoriesController = (app: Application) => {
    app.get<GetCategoryById["Request"], GetCategoryById["Response"], {}>(
        url(":id"),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { id } = req.params;
            const category = new SQLite3Entities.Category(sqlite3Db, +id);
            const model = await category.model();
            res.json(model);
        }
    );

    app.get<{}, GetAllCategories["Response"], {}>(
        url(),
        authMiddleware(SECRET_KEY),
        async (_, res) => {
            const categories = new SQLite3Entities.AllCategories(sqlite3Db);
            const model = await categories.model();
            res.json(model);
        }
    );

    app.patch<
        ModifyCategoryById["Request"]["Query"],
        {},
        ModifyCategoryById["Request"]["Body"]
    >(url(":id"), authMiddleware(SECRET_KEY), async (req, res) => {
        const category = new SQLite3Entities.Category(
            sqlite3Db,
            +req.params.id
        );
        try {
            await category.modify(req.body);
            res.sendStatus(200);
        } catch (e: any) {
            res.status(500).send(e);
        }
    });

    app.post<{}, {}, CreateCategory["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const categories = new SQLite3Entities.AllCategories(sqlite3Db);
            try {
                await categories.create(req.body);
                res.sendStatus(200);
            } catch (e: any) {
                res.status(500).send(e);
            }
        }
    );
};
