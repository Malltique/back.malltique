import { Application, Request, Response } from "express";
import { sqlite3Db, SQLite3Entities } from "../../../db";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import {
    CreateCategory,
    CreateCategoriesSchema,
    GetAllCategories,
    GetCategoryById,
    GetCategoryByIdRequestSchema,
    ModifyCategoryById,
    ModifyCategoryByIdQueryBodySchema,
    ModifyCategoryByIdQueryRequestSchema,
} from "./schemas";
import { CategoryTitle } from "../../../db/sqlite3/entities";

const url = buildURL("categories");

export const injectCategoriesController = (app: Application) => {
    app.get<GetCategoryById["Request"], GetCategoryById["Response"], {}>(
        url(":id"),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { data, success, error } =
                GetCategoryByIdRequestSchema.safeParse(req.params);
            if (!success) {
                res.status(400).json(error);
            }
            const { id } = data!;
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
        const {
            success: querySuccess,
            data: queryData,
            error: queryError,
        } = ModifyCategoryByIdQueryRequestSchema.safeParse(req.params);

        if (!querySuccess) {
            res.status(400).json(queryError);
            return;
        }

        const category = new SQLite3Entities.Category(
            sqlite3Db,
            +queryData!.id
        );
        const { success, data, error } =
            ModifyCategoryByIdQueryBodySchema.safeParse(req.body);
        if (!success) {
            res.status(400).json(error);
            return;
        }
        try {
            await category.modify({ name: data?.name as CategoryTitle });
            res.sendStatus(200);
        } catch (e: any) {
            res.status(500).send(e);
        }
    });

    app.post<{}, {}, CreateCategory["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { data, error, success } = CreateCategoriesSchema.safeParse(
                req.body
            );
            if (!success) {
                res.status(400).json(error);
                return;
            }
            const categories = new SQLite3Entities.AllCategories(sqlite3Db);
            try {
                await categories.create(
                    data!.map((x) => ({ name: x.name as CategoryTitle }))
                );
                res.sendStatus(200);
            } catch (e: any) {
                res.status(500).send(e);
            }
        }
    );
};
