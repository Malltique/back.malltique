import jwt from "jsonwebtoken";
import { Application, Request } from "express";
import { buildURL } from "../../utils";
import { AllUsers } from "../../../db/sqlite3/entities/Users";
import { sqlite3Db } from "../../../db";
import { SECRET_KEY } from "../../middlewares";
import { Register, Login } from "./types";

const url = buildURL("auth");

export const injectAuthController = (app: Application) => {
    app.post<{}, {}, Register["Request"]>(url("register"), async (req, res) => {
        const { email, password, name, roles } = req.body;
        const { create } = new AllUsers(sqlite3Db);
        await create([{ email, name, password, roles }]);
        res.status(201).send("Пользователь зарегистрирован!");
    });

    app.post<{}, {}, Login["Request"]>(url("login"), async (req, res) => {
        const { email, password } = req.body;
        const { login } = new AllUsers(sqlite3Db);
        const [user, status] = await login(email, password);
        if (status === "Not found") {
            res.status(400).send("Пользователь не найден");
            return;
        }

        if (status === "Wrong password") {
            res.status(403).send("Неверный пароль");
            return;
        }

        const token = jwt.sign(user!, SECRET_KEY, {
            expiresIn: "1h",
        });

        res.json({ token });
    });
};
