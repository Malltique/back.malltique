import { IProductsRepository } from "../types";
import { DatabaseWithQueries } from "../../../utils";
import {
    DELETE_ALL_PRODUCTS,
    INSERT_PRODUCT_CATEGORIES,
    INSERT_PRODUCT_DATA,
    SELECT_ALL_PRODUCT_LIST_DATA,
} from "../sql";

export class AllProducts implements IProductsRepository {
    public constructor(private readonly _database: DatabaseWithQueries) {}
    listModel: IProductsRepository["listModel"] = () => {
        return this._database.getAll(SELECT_ALL_PRODUCT_LIST_DATA);
    };
    create: IProductsRepository["create"] = async (payload) => {
        const promise = Promise.all(
            payload.map(async (payloadData) => {
                const runResult = await this._database.execute(
                    INSERT_PRODUCT_DATA({
                        description: payloadData.description,
                        name: payloadData.name,
                        seller: payloadData.seller,
                    })
                );
                if (payloadData.categories.length) {
                    await this._database.execute(
                        INSERT_PRODUCT_CATEGORIES(
                            runResult.lastID,
                            payloadData.categories
                        )
                    );
                }

                return runResult;
            })
        );

        return promise;
    };

    deleteAll: IProductsRepository["deleteAll"] = () => {
        return this._database.execute(DELETE_ALL_PRODUCTS);
    };
}
