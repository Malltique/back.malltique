import sqliteWrapper from "sqlite3";
import { DatabaseWithQueries, Sqlite3Database } from "./sqlite3/utils";
import { CategoriesSQL } from "./sqlite3/entities";
import {
    DROP_CATEGORIES_TABLE,
    INITIALIZE_CATEGORIES_TABLE,
} from "./sqlite3/entities/Categories/sql";
import {
    DROP_ORDER_PRODUCTS_TABLE,
    DROP_ORDERS_TABLE,
    INITIALIZE_ORDER_PRODUCTS_TABLE,
    INITIALIZE_ORDERS_TABLE,
} from "./sqlite3/entities/Orders/sql";
import {
    DROP_PRODUCT_CATEGORIES_TABLE,
    DROP_PRODUCTS_TABLE,
    INITIALIZE_PRODUCT_CATEGORIES_TABLE,
    INITIALIZE_PRODUCTS_TABLE,
} from "./sqlite3/entities/Products/sql";
import {
    DROP_ROLES_TABLE,
    INITIALIZE_ROLES_TABLE,
} from "./sqlite3/entities/Roles/sql";
import {
    DROP_USER_ROLES_TABLE,
    DROP_USERS_TABLE,
    INITIALIZE_USER_ROLES_TABLE,
    INITIALIZE_USERS_TABLE,
} from "./sqlite3/entities/Users/sql";

const sqlite3 = sqliteWrapper.verbose();
const db = new sqlite3.Database("./database.db");
const sqlite3Db = new Sqlite3Database(db);

const dropAllTables = async (db: DatabaseWithQueries) => {
    await db.execute(DROP_CATEGORIES_TABLE);
    await db.execute(DROP_ORDERS_TABLE);
    await db.execute(DROP_ORDER_PRODUCTS_TABLE);
    await db.execute(DROP_PRODUCTS_TABLE);
    await db.execute(DROP_PRODUCT_CATEGORIES_TABLE);
    await db.execute(DROP_ROLES_TABLE);
    await db.execute(DROP_USERS_TABLE);
    await db.execute(DROP_USER_ROLES_TABLE);
};

const createAllTables = async (db: DatabaseWithQueries) => {
    await db.execute(INITIALIZE_ROLES_TABLE);
    await db.execute(INITIALIZE_CATEGORIES_TABLE);
    await db.execute(INITIALIZE_USERS_TABLE);
    await db.execute(INITIALIZE_PRODUCTS_TABLE);
    await db.execute(INITIALIZE_ORDERS_TABLE);
    await db.execute(INITIALIZE_ORDER_PRODUCTS_TABLE);
    await db.execute(INITIALIZE_PRODUCT_CATEGORIES_TABLE);
    await db.execute(INITIALIZE_USER_ROLES_TABLE);
};

export const prepareDB = async (db: DatabaseWithQueries) => {
    await dropAllTables(db);
    await createAllTables(db);
};

const main = () => {
    createAllTables(sqlite3Db);
};

main();

export * as SQLite3Entities from "./sqlite3/entities";
export { sqlite3Db };
