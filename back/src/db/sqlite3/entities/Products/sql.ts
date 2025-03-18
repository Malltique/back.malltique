import { updateObject, updatePayload } from "../../utils";

/**
 * Create
 */
export const INITIALIZE_PRODUCTS_TABLE = [
    `
      CREATE TABLE IF NOT EXISTS Products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        seller_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        FOREIGN KEY (seller_id) REFERENCES Users(id) ON DELETE CASCADE
      )
    `,
    undefined,
] as const;

export const INITIALIZE_PRODUCT_CATEGORIES_TABLE = [
    `
      CREATE TABLE IF NOT EXISTS ProductCategories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          category_id INTEGER,
          FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE,
          FOREIGN KEY (category_id) REFERENCES Categories(id) ON DELETE CASCADE
      )
  `,
    undefined,
] as const;

/**
 * Select
 */
export const SELECT_ALL_PRODUCT_LIST_DATA = [
    `SELECT id, name, description FROM Products`,
    undefined,
] as const;

export const SELECT_PRODUCT_BY_ID = (id: number) =>
    [`SELECT * FROM Products WHERE id = ?`, [id]] as const;

export const SELECT_PRODUCT_CATEGORIES_IDS = (productId: number) =>
    [
        `SELECT category_id FROM ProductCategories WHERE product_id = ?`,
        [productId],
    ] as const;

/**
 * Drop
 */
export const DROP_PRODUCTS_TABLE = [
    "DROP TABLE IF EXISTS Products",
    undefined,
] as const;

export const DROP_PRODUCT_CATEGORIES_TABLE = [
    "DROP TABLE IF EXISTS ProductCategories",
    undefined,
] as const;

/**
 * Update
 */

export const UPDATE_PRODUCT_BY_ID = (id: number, payload: any) =>
    [
        `UPDATE Products SET ${updatePayload(payload)} WHERE id = :id`,
        { ...updateObject(payload), ":id": id },
    ] as const;

/**
 * Delete
 */

export const DELETE_PRODUCT_BY_ID = (id: number) =>
    [`DELETE FROM Products WHERE id = ?`, [id]] as const;

export const DELETE_ALL_PRODUCTS = ["DELETE FROM Products", undefined] as const;

/**
 * Insert
 */

export const INSERT_PRODUCT_DATA = (payload: {
    seller: number;
    name: string;
    description: string;
}) =>
    [
        `INSERT INTO Products (seller_id, name, description) VALUES (?, ?, ?)`,
        [payload.seller, payload.name, payload.description],
    ] as const;

export const INSERT_PRODUCT_CATEGORIES = (
    productId: number,
    categoriesIds: number[]
) =>
    [
        `INSERT INTO ProductCategories (product_id, category_id) VALUES ${categoriesIds
            .map((x) => `(${productId}, ?)`)
            .join(", ")}`,
        categoriesIds,
    ] as const;
