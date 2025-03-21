import { Express, Request, Response } from "express";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import { CreateRole, GetRoles } from "./types";
import { AllRoles } from "../../../db/sqlite3/entities/Roles/repositories";
import { sqlite3Db } from "../../../db";

const url = buildURL("roles");

export const injectRolesController = (app: Express) => {
    app.post(
        url(),
        authMiddleware(SECRET_KEY),
        async (req: Request<{}, {}, CreateRole["Request"]>, res: Response) => {
            const roles = new AllRoles(sqlite3Db);
            await roles.create(req.body);
            res.sendStatus(200);
        }
    );

    app.get(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res: Response<GetRoles["Response"]>) => {
            const roles = new AllRoles(sqlite3Db);
            const model = await roles.model();
            res.json(model);
        }
    );
};
