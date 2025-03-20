import { IOrder } from "./types";
import { DatabaseWithQueries } from "../../utils";
import {
    INSERT_PRODUCT_IN_ORDER,
    REMOVE_PRODUCT_FROM_ORDER,
    SELECT_PRODUCT_QUANTITY_IN_ORDER,
    SELECT_PRODUCTS_DATA_BY_ORDER_ID,
    SELECT_USER_ID_BY_ORDER_ID,
    UPDATE_PRODUCT_QUANTITY_IN_ORDER,
} from "./sql";
import { User } from "../Users";
import { ProductsWithIds } from "../Products/repositories";

export class Order implements IOrder {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _id: number
    ) {}

    id: IOrder["id"] = () => this._id;

    model: IOrder["model"] = async () => {
        const { user_id } = await this._database.getOne<{ user_id: number }>(
            SELECT_USER_ID_BY_ORDER_ID(this.id())
        );

        const userEntity = new User(this._database, user_id);
        const user = await userEntity.model();

        const productsData = await this._database.getAll<{
            product_id: number;
            quantity: number;
        }>(SELECT_PRODUCTS_DATA_BY_ORDER_ID(this._id));

        const orderProductEntities = new ProductsWithIds(
            this._database,
            productsData.flatMap((x) => x.product_id)
        );

        const model = await orderProductEntities.listModel();

        return {
            buyer: user,
            id: this.id(),
            data: model.map((product) => ({
                quantity: productsData.find((x) => x.product_id === product.id)!
                    .quantity,
                product: product,
            })),
        };
    };

    removeProduct: IOrder["removeProduct"] = async (productId, quantity) => {
        const result = await this._database.getOne<{ quantity: number }>(
            SELECT_PRODUCT_QUANTITY_IN_ORDER(this.id(), productId)
        );
        const oldQuantity = result?.quantity ?? 0;
        if (!oldQuantity) {
            return { error: "Product was not found" };
        }
        const newRawQuantity = oldQuantity - quantity;
        if (newRawQuantity < 0) {
            return {
                error: "You can't remove more items than it were in order",
            };
        }

        if (newRawQuantity === 0) {
            return this._database.execute(
                REMOVE_PRODUCT_FROM_ORDER(this.id(), productId)
            );
        }

        return this._database.execute(
            UPDATE_PRODUCT_QUANTITY_IN_ORDER(
                this.id(),
                productId,
                newRawQuantity
            )
        );
    };

    addProduct: IOrder["addProduct"] = async (productId, quantity) => {
        const result = await this._database.getOne<{ quantity: number }>(
            SELECT_PRODUCT_QUANTITY_IN_ORDER(this.id(), productId)
        );
        const oldQuantity = result?.quantity ?? 0;

        if (!oldQuantity) {
            return this._database.execute(
                INSERT_PRODUCT_IN_ORDER(this.id(), productId, quantity)
            );
        }

        const newQuantity = oldQuantity + quantity;

        return this._database.execute(
            UPDATE_PRODUCT_QUANTITY_IN_ORDER(this.id(), productId, newQuantity)
        );
    };
}
