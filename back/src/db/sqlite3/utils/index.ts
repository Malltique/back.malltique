import { Database } from "sqlite3";

export type DatabaseWithQueries = {
  selectFromDatabase: <T>(sql: string) => Promise<T[]>;
  selectOneFromDatabase: <T>(sql: string) => Promise<T>;
  executeCommand: (sql: string) => Promise<void>;
};

export class Sqlite3Database implements DatabaseWithQueries {
  public constructor(private readonly database: Database) {}

  public selectFromDatabase = <T>(sql: string) => {
    return new Promise<T[]>((resolve, reject) => {
      this.database.all<T>(sql, (error, rows) => {
        if (error) {
          reject(error);
        }

        resolve(rows);
      });
    });
  };

  public selectOneFromDatabase = <T>(sql: string) => {
    return new Promise<T>((resolve, reject) => {
      this.database.get<T>(sql, (error, row) => {
        if (error) {
          reject(error);
        }

        resolve(row);
      });
    });
  };

  public executeCommand = (sql: string) => {
    return new Promise<void>((resolve, reject) => {
      this.database.exec(sql, (error) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  };
}

export * as SQLHelpers from "./sqlHelpers";
