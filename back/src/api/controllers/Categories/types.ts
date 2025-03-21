import { Parameter } from "../../../contracts";
import {
    CategoryDTO,
    ICategoriesRepository,
    ICategory,
} from "../../../db/sqlite3/entities";

export type GetCategoryById = {
    Request: { id: string };
    Response: CategoryDTO;
};

export type GetAllCategories = {
    Response: Array<CategoryDTO>;
};

export type ModifyCategoryById = {
    Request: { Query: { id: string }; Body: Parameter<ICategory["modify"]> };
};

export type CreateCategory = {
    Request: Parameter<ICategoriesRepository["create"]>;
};
