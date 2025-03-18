import { DatabaseWithQueries } from "../../utils";
import {
    DELETE_CATEGORY_BY_ID,
    SELECT_CATEGORY_BY_ID,
    UPDATE_CATEGORY_BY_ID,
} from "./sql";
import { ICategory, CategoryDTO } from "./types";

export class Category implements ICategory {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _id: number
    ) {}

    id: ICategory["id"] = () => {
        return this._id;
    };

    model: ICategory["model"] = async () => {
        const result = await this._database.getOne<CategoryDTO>(
            SELECT_CATEGORY_BY_ID(this.id())
        );

        return result;
    };

    delete: ICategory["delete"] = () => {
        return this._database.execute(DELETE_CATEGORY_BY_ID(this.id()));
    };

    modify: ICategory["modify"] = (payload) => {
        return this._database.execute(
            UPDATE_CATEGORY_BY_ID(this.id(), payload)
        );
    };
}
