import { IProduct, ProductDTO } from "./types";
import { DatabaseWithQueries } from "../../utils";
import {
    DELETE_PRODUCT_BY_ID,
    SELECT_PRODUCT_BY_ID,
    SELECT_PRODUCT_CATEGORIES_IDS,
    UPDATE_PRODUCT_BY_ID,
} from "./sql";
import { User } from "../Users";
import { CategoriesWithIds } from "../Categories";

export class Product implements IProduct {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _id: number
    ) {}

    id: IProduct["id"] = () => this._id;
    model: IProduct["model"] = async () => {
        const { description, id, name, seller_id } =
            await this._database.getOne<
                Omit<ProductDTO, "seller" | "categories"> & {
                    seller_id: number;
                }
            >(SELECT_PRODUCT_BY_ID(this.id()));

        const seller = new User(this._database, seller_id);
        const { name: sellerName } = await seller.model();
        const categoriesData = await this._database.getAll<{
            category_id: number;
        }>(SELECT_PRODUCT_CATEGORIES_IDS(this.id()));
        const categoryIds = categoriesData.flatMap((x) => x.category_id);
        const categoriesWithIds = new CategoriesWithIds(
            this._database,
            categoryIds
        );
        const categories = await categoriesWithIds.model();

        return {
            categories,
            description,
            id,
            name,
            seller: { id: seller_id, name: sellerName },
        };
    };
    modify: IProduct["modify"] = (payload) => {
        return this._database.execute(UPDATE_PRODUCT_BY_ID(this.id(), payload));
    };
    delete: IProduct["delete"] = () => {
        return this._database.execute(DELETE_PRODUCT_BY_ID(this.id()));
    };
}
