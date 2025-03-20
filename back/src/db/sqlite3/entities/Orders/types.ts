import { RunResult } from "sqlite3";
import { DatabaseEntity, Identified } from "../../../../contracts";
import { ListProductDTO } from "../Products";
import { UserDTO } from "../Users/types";

export type OrderDTO = Identified & {
    buyer: UserDTO;
    data: Array<{
        product: ListProductDTO;
        quantity: number;
    }>;
};

export type IOrder = Pick<DatabaseEntity<OrderDTO>["Item"], "id" | "model"> & {
    removeProduct: (
        productId: number,
        quantity: number
    ) => Promise<
        | RunResult
        | {
              error:
                  | "Product was not found"
                  | "You can't remove more items than it were in order";
          }
    >;
    addProduct: (productId: number, quantity: number) => Promise<RunResult>;
};

export type IOrderRepository = Omit<
    DatabaseEntity<OrderDTO>["Repository"],
    "create" | "model"
> & {
    create: (payload: {
        userId: number;
        productsData: { productId: number; quantity: number }[];
    }) => Promise<RunResult>;
};
