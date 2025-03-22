import { Express } from "express";
import { buildURL } from "../../utils";
import { authMiddleware, SECRET_KEY } from "../../middlewares";
import {
    CreateOrder,
    CreateOrderSchema,
    GetOrder,
    GetOrderByIdRequestSchema,
} from "./schemas";
import { AllOrders } from "../../../db/sqlite3/entities/Orders/repositories";
import { sqlite3Db } from "../../../db";
import { Order } from "../../../db/sqlite3/entities/Orders/item";

const url = buildURL("orders");

export const injectOrdersController = (app: Express) => {
    app.post<{}, {}, CreateOrder["Request"]>(
        url(),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { success, data, error } = CreateOrderSchema.safeParse(
                req.body
            );
            if (!success) {
                res.status(400).json(error);
            }
            const orders = new AllOrders(sqlite3Db);
            await orders.create(data!);
            res.sendStatus(200);
        }
    );

    app.get<GetOrder["Request"], GetOrder["Response"], {}>(
        url(":id"),
        authMiddleware(SECRET_KEY),
        async (req, res) => {
            const { success, data, error } =
                GetOrderByIdRequestSchema.safeParse(req.params);
            if (!success) {
                res.status(400).json(error);
                return;
            }
            const order = new Order(sqlite3Db, +data!.id);
            const model = await order.model();
            res.json(model);
        }
    );
};
