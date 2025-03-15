import { DatabaseEntity, DTO } from "../../../../entities/contracts";

export type CategoryTitle = "foods" | "electronics";
export type CategoryDTO = DTO<{}, number, CategoryTitle>;

type CategoryDbEntity = DatabaseEntity<CategoryDTO>;
export type ICategory = CategoryDbEntity["Item"];
export type ICategoriesRepository = CategoryDbEntity["Repository"];
