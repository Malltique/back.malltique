import { Parameter } from "../../../contracts";
import {
    IOrderRepository,
    OrderDTO,
} from "../../../db/sqlite3/entities/Orders";

export type CreateOrder = { Request: Parameter<IOrderRepository["create"]> };

export type GetOrder = { Request: { id: string }; Response: OrderDTO };
