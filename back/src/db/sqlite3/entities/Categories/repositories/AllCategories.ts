import { DatabaseWithQueries } from "../../../utils";
import {
    DELETE_ALL_CATEGORIES,
    INSERT_CATEGORIES,
    SELECT_ALL_CATEGORIES,
} from "../sql";
import { CategoryDTO, ICategoriesRepository } from "../types";

export class AllCategories implements ICategoriesRepository {
    public constructor(private readonly _database: DatabaseWithQueries) {}

    model: ICategoriesRepository["model"] = () => {
        return this._database.getAll<CategoryDTO>(SELECT_ALL_CATEGORIES);
    };

    create: ICategoriesRepository["create"] = (payload) => {
        return this._database.execute(INSERT_CATEGORIES(payload));
    };

    deleteAll: ICategoriesRepository["deleteAll"] = () => {
        return this._database.execute(DELETE_ALL_CATEGORIES);
    };
}
