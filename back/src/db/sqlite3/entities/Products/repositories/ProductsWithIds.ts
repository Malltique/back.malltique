import { IProductsRepository } from "../types";
import { DatabaseWithQueries } from "../../../utils";
import { AllProducts } from "./AllProducts";
import { DELETE_PRODUCTS_BY_IDS, SELECT_PRODUCTS_BY_IDS } from "../sql";

export class ProductsWithIds implements IProductsRepository {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _ids: number[]
    ) {}

    create: IProductsRepository["create"] = new AllProducts(this._database)
        .create;
    deleteAll: IProductsRepository["deleteAll"] = () => {
        return this._database.execute(DELETE_PRODUCTS_BY_IDS(this._ids));
    };
    listModel: IProductsRepository["listModel"] = () => {
        return this._database.getAll(SELECT_PRODUCTS_BY_IDS(this._ids));
    };
}
