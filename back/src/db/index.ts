import sqliteWrapper from "sqlite3";
import { Sqlite3Database } from "./sqlite3/utils";
import { CategoriesSQL } from "./sqlite3/entities";

const sqlite3 = sqliteWrapper.verbose();
const db = new sqlite3.Database("./database.db");

const prepareDB = (db: sqliteWrapper.Database) => {
  db.exec(CategoriesSQL.INITIALIZE_TABLE);
};

const main = () => {
  prepareDB(db);
};

main();

export const sqlite3Db = new Sqlite3Database(db);
export * as SQLite3Entities from "./sqlite3/entities";
