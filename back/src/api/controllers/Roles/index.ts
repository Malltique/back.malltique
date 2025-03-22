import { Express } from "express";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import { CreateRole, CreateRolesSchema, GetRoles } from "./schemas";
import { AllRoles } from "../../../db/sqlite3/entities/Roles/repositories";
import { sqlite3Db } from "../../../db";
import { Roles } from "../../../db/sqlite3/entities/Roles/types";

const url = buildURL("roles");

export const injectRolesController = (app: Express) => {
    app.post<{}, {}, CreateRole["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { success, data, error } = CreateRolesSchema.safeParse(
                req.body
            );
            if (!success) {
                res.status(400).json(error);
                return;
            }
            const roles = new AllRoles(sqlite3Db);
            await roles.create(data!.map((x) => ({ name: x.name as Roles })));
            res.sendStatus(200);
        }
    );

    app.get<{}, GetRoles["Response"], {}>(
        url(),
        authMiddleware(SECRET_KEY),
        async (_, res) => {
            const roles = new AllRoles(sqlite3Db);
            const model = await roles.model();
            res.json(model);
        }
    );
};
