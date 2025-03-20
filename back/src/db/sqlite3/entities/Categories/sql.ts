import { CreatePayload } from "../../../../contracts";
import { arrayTemplate, updatePayload } from "../../utils";
import { CategoryDTO } from "./types";

export const INITIALIZE_CATEGORIES_TABLE = [
    `
    CREATE TABLE IF NOT EXISTS Categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
  )`,
    undefined,
] as const;

export const SELECT_CATEGORY_BY_ID = (id: number) =>
    ["SELECT * FROM Categories WHERE id = ?", [id]] as const;

export const SELECT_ALL_CATEGORIES = [
    "SELECT * FROM Categories",
    undefined,
] as const;

export const SELECT_CATEGORIES_BY_IDS = (ids: number[]) =>
    [
        `SELECT * FROM Categories WHERE id in (${arrayTemplate(ids, false)})`,
        ids,
    ] as const;

export const UPDATE_CATEGORY_BY_ID = (
    id: number,
    payload: Record<string, any>
) =>
    [
        `UPDATE Categories SET ${updatePayload(payload)} WHERE id = :id`,
        { ":id": id, ":name": payload["name"] },
    ] as const;

export const INSERT_CATEGORIES = (payload: CreatePayload<CategoryDTO>[]) =>
    [
        `INSERT INTO Categories (name) VALUES ${arrayTemplate(payload)}`,
        payload.map((x) => x.name),
    ] as const;

export const DELETE_CATEGORY_BY_ID = (id: number) =>
    ["DELETE FROM Categories WHERE id = ?", [id]] as const;

export const DELETE_CATEGORIES_BY_IDS = (ids: number[]) =>
    [
        `DELETE FROM Categories WHERE id IN (${arrayTemplate(ids, false)})`,
        ids,
    ] as const;

export const DELETE_ALL_CATEGORIES = [
    "DELETE FROM CATEGORIES",
    undefined,
] as const;

export const DROP_CATEGORIES_TABLE = [
    "DROP TABLE IF EXISTS Categories",
    undefined,
] as const;
