import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const SECRET_KEY = "secret enough to be commited lol";

export const authMiddleware: (aecretKey: string) => RequestHandler =
    (secretKey) => (req, res, next) => {
        const token = req.headers["authorization"];

        if (!token) {
            res.sendStatus(403);
            return;
        }

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            // @ts-ignore
            req.user = user;
            next();
        });
    };
