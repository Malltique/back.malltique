import { Database } from "sqlite3";
import sqliteWrapper from "sqlite3";

export type DatabaseWithQueries = {
    getAll: <T>(queryData: readonly [string, any]) => Promise<T[]>;
    getOne: <T>(queryData: readonly [string, any]) => Promise<T>;
    execute: (queryData: readonly [string, any]) => Promise<void>;
};

export class Sqlite3Database implements DatabaseWithQueries {
    public constructor(private readonly database: Database) {}

    public getAll = <T>([sql, params]: readonly [string, any]) => {
        return new Promise<T[]>((resolve, reject) => {
            this.database.all<T>(sql, params, (error, rows) => {
                if (error) {
                    reject(error);
                }

                resolve(rows);
            });
        });
    };

    public getOne = <T>([sql, params]: readonly [string, any]) => {
        return new Promise<T>((resolve, reject) => {
            this.database.get<T>(sql, params, (error, row) => {
                if (error) {
                    reject(error);
                }

                resolve(row);
            });
        });
    };

    public execute = ([sql, params]: readonly [string, any]) => {
        if (params) {
            return new Promise<void>((resolve, reject) => {
                this.database.run(sql, params, (error) => {
                    if (error) {
                        reject(error);
                    }

                    resolve();
                });
            });
        }
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

export const updatePayload = (payload: object) => {
    const keys = Object.keys(payload);
    const keysPart = keys.map((key) => `${key} = :${key}`);
    return keysPart.join(", ");
};

export const arrayTemplate = (payload: any[]) =>
    payload.map((x) => "(?)").join(", ");

export const generateInMemoryDb = () => {
    const sqlite3 = sqliteWrapper.verbose();
    const db = new sqlite3.Database(":memory:");
    const inMemoryDb = new Sqlite3Database(db);
    return inMemoryDb;
};
