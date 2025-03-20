import { updateObject, updatePayload } from "../../utils";
import { IUsersRepository } from "./types";

export const INITIALIZE_USERS_TABLE = [
    `
        CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            hashed_password TEXT NOT NULL
        )
    `,
    undefined,
] as const;

export const INITIALIZE_USER_ROLES_TABLE = [
    `
        CREATE TABLE IF NOT EXISTS UserRoles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            role_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
            FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
        )
    `,
    undefined,
] as const;

export const DROP_USERS_TABLE = [
    `DROP TABLE IF EXISTS Users`,
    undefined,
] as const;

export const DROP_USER_ROLES_TABLE = [
    `DROP TABLE IF EXISTS UserRoles`,
    undefined,
] as const;

export const SELECT_ROLE_IDS_FOR_USER = (userId: number) =>
    [`SELECT role_id FROM UserRoles WHERE user_id = ?`, [userId]] as const;

export const DELETE_USER_BY_ID = (userId: number) =>
    ["DELETE FROM Users WHERE id = ?", [userId]] as const;

export const SELECT_USER_BY_ID = (userId: number) =>
    ["SELECT * FROM Users WHERE id = ?", [userId]] as const;

export const SELECT_USER_BY_EMAIL = (email: string) =>
    ["SELECT * FROM Users WHERE email = ?", [email]] as const;

export const UPDATE_USER_BY_ID = (
    userId: number,
    payload: Record<string, any>
) =>
    [
        `UPDATE Users SET ${updatePayload(payload)} WHERE id = :id`,
        { ...updateObject(payload), ":id": userId },
    ] as const;

export const INSERT_USER = (
    userPayload: Parameters<IUsersRepository["create"]>[0][number]
) =>
    [
        "INSERT INTO Users (name, email, hashed_password) VALUES (?, ?, ?) RETURNING id",
        [userPayload.name, userPayload.email, userPayload.password],
    ] as const;

export const INSERT_USER_ROLES = (
    userPayload: Parameters<IUsersRepository["create"]>[0][number],
    userId: number
) =>
    [
        `INSERT INTO UserRoles (user_id, role_id) VALUES ${userPayload.roles
            .map(() => `(${userId}, ?)`)
            .join(", ")}`,
        userPayload.roles,
    ] as const;
