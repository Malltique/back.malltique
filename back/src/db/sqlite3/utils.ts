import { Database, RunResult, Statement } from "sqlite3";
import sqliteWrapper from "sqlite3";

export type DatabaseWithQueries = {
    getAll: <T>(queryData: readonly [string, any]) => Promise<T[]>;
    getOne: <T>(queryData: readonly [string, any]) => Promise<T>;
    execute: (queryData: readonly [string, any]) => Promise<RunResult>;
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
        // if (params) {
        return new Promise<RunResult>((resolve, reject) => {
            const a = this.database.run(sql, params, function (error) {
                if (error) {
                    reject(error);
                }

                resolve(this);
            });
        });
        // }
        // return new Promise<Statement>((resolve, reject) => {
        //     this.database.exec(sql, function (error) {
        //         if (error) {
        //             reject(error);
        //         }

        //         resolve(this);
        //     });
        // });
    };
}

export const updatePayload = (payload: object) => {
    const keys = Object.keys(payload);
    const keysPart = keys.map((key) => `${key} = :${key}`);
    return keysPart.join(", ");
};

export const updateObject = (payload: object) => {
    const keys = Object.keys(payload);
    // @ts-ignore
    return Object.fromEntries(keys.map((x) => [`:${x}`, payload[x]]));
};

export const arrayTemplate = (payload: any[], separate = true) =>
    payload.map((x) => (separate ? "(?)" : "?")).join(", ");

export const generateInMemoryDb = () => {
    const sqlite3 = sqliteWrapper.verbose();
    const db = new sqlite3.Database(":memory:");
    const inMemoryDb = new Sqlite3Database(db);
    return inMemoryDb;
};
