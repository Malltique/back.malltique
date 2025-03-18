import { arrayTemplate, updatePayload } from "../../utils";
import { Roles } from "./types";

export const INITIALIZE_ROLES_TABLE = [
    `
        CREATE TABLE IF NOT EXISTS Roles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    `,
    undefined,
] as const;

export const DROP_ROLES_TABLE = [
    `DROP TABLE IF EXISTS Roles`,
    undefined,
] as const;

export const INSERT_ROLES = (roles: Roles[]) =>
    [`INSERT INTO Roles (name) VALUES ${arrayTemplate(roles)}`, roles] as const;

export const SELECT_ALL_ROLES = [`SELECT * FROM Roles`, undefined] as const;

export const SELECT_ROLE_BY_ID = (id: number) =>
    [`SELECT * FROM Roles WHERE id = ?`, [id]] as const;

export const DELETE_ALL_ROLES = ["DELETE FROM Roles", undefined] as const;

export const DELETE_ROLE_BY_ID = (id: number) =>
    ["DELETE FROM Roles WHERE id = ?", [id]] as const;

export const UPDATE_ROLE_BY_ID = (id: number, name: string) =>
    [
        `UPDATE Roles SET ${updatePayload({
            name,
        })} WHERE id = :id`,
        { ":id": id, ":name": name },
    ] as const;
