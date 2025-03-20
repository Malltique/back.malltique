import { IOrderRepository } from "../types";
import { DatabaseWithQueries } from "../../../utils";
import { INSERT_ORDER_FOR_USER, REMOVE_ALL_ORDERS } from "../sql";
import { Order } from "../item";

export class AllOrders implements IOrderRepository {
    public constructor(private readonly _database: DatabaseWithQueries) {}

    create: IOrderRepository["create"] = async ({ productsData, userId }) => {
        const runResult = await this._database.execute(
            INSERT_ORDER_FOR_USER(userId)
        );
        const order = new Order(this._database, runResult.lastID);
        productsData.forEach(async (x) => {
            await order.addProduct(x.productId, x.quantity);
        });

        return runResult;
    };

    deleteAll: IOrderRepository["deleteAll"] = () => {
        return this._database.execute(REMOVE_ALL_ORDERS);
    };
}
