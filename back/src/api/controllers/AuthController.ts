import jwt from "jsonwebtoken";
// @ts-ignore
import bcrypt from "bcrypt";
import { Application, Request } from "express";
import { buildURL } from "../utils";

const SECRET_KEY = "SAFVNNQWEFN321N8F8129128FHAWUFQBWUFBAOUSWVFAIWUFASIUidigsd";

const url = buildURL("auth");

export const injectAuthController = (app: Application) => {
  const users: Array<{ username: string; password: string }> = [];

  app.post(
    url("register"),
    async (
      req: Request<{}, {}, { username: string; password: string }>,
      res
    ) => {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      users.push({ username, password: hashedPassword });
      res.status(201).send("Пользователь зарегистрирован!");
    }
  );

  app.post(
    url("login"),
    async (
      req: Request<{}, {}, { username: string; password: string }>,
      res
    ) => {
      const { username, password } = req.body;
      const user = users.find((u) => u.username === username);
      if (!user) {
        res.status(400).send("Пользователь не найден");
        return;
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(403).send("Неверный пароль");
        return;
      }

      const token = jwt.sign(
        { username: user.username, role: "ADMIN" /** */ },
        SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.json({ token });
    }
  );
};

// @ts-ignore
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.sendStatus(403); // Доступ запрещен
  }
  // @ts-ignore
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
