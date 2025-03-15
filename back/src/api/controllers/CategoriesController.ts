import { Application, Request, Response } from "express";
import { sqlite3Db, SQLite3Entities } from "../../db";
import { verifyToken } from "./AuthController";
import {
  Category,
  CategoriesRepository,
  CategoryDTO,
  ICategory,
  ICategoriesRepository,
} from "../../db/sqlite3/entities";
import { Parameter } from "./types";
import { buildURL } from "../utils";

const url = buildURL("categories");

export const injectCategoriesController = (app: Application) => {
  app.get(
    url(":id"),
    verifyToken,
    async (req: Request<{ id: string }>, res: Response<CategoryDTO>) => {
      const { id } = req.params;
      const tag = Category.WithId(sqlite3Db, +id);
      const model = await tag.model();
      res.json(model);
    }
  );

  app.get(url(), verifyToken, async (_, res: Response<CategoryDTO[]>) => {
    const categories = CategoriesRepository.All(sqlite3Db);
    const model = await categories.model();
    res.json(model);
  });

  app.patch(
    url(":id"),
    verifyToken,
    async (
      req: Request<{ id: string }, {}, Parameter<ICategory["modify"]>>,
      res
    ) => {
      const category = Category.WithId(sqlite3Db, +req.params.id);
      try {
        await category.modify(req.body);
        res.sendStatus(200);
      } catch (e: any) {
        res.status(500).send(e);
      }
    }
  );

  app.post(
    url(),
    verifyToken,
    async (
      req: Request<{}, {}, Parameter<ICategoriesRepository["create"]>>,
      res
    ) => {
      const tags = CategoriesRepository.All(sqlite3Db);
      try {
        await tags.create(req.body);
        res.sendStatus(200);
      } catch (e: any) {
        res.status(500).send(e);
      }
    }
  );
};
