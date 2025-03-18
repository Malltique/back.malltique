import { ICategoriesRepository } from "../types";
import { DatabaseWithQueries } from "../../../utils";
import { AllCategories } from "./AllCategories";
import { DELETE_CATEGORIES_BY_IDS, SELECT_CATEGORIES_BY_IDS } from "../sql";

export class CategoriesWithIds implements ICategoriesRepository {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _ids: number[]
    ) {}

    model: ICategoriesRepository["model"] = () => {
        return this._database.getAll(SELECT_CATEGORIES_BY_IDS(this._ids));
    };
    create: ICategoriesRepository["create"] = new AllCategories(this._database)
        .create;

    deleteAll: ICategoriesRepository["deleteAll"] = () => {
        return this._database.execute(DELETE_CATEGORIES_BY_IDS(this._ids));
    };
}
