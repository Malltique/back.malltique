import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const SECRET_KEY = "secret enough to be commited lol";

export const authMiddleware: (secretKey: string) => RequestHandler =
    (secretKey) => (req, res, next) => {
        const token = req.headers["auth"];

        if (!token) {
            res.sendStatus(403);
            return;
        }

        jwt.verify(token as string, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // @ts-ignore
            req.user = user;
            next();
        });
    };
