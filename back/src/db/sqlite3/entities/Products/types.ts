import { DatabaseEntity, DTO } from "../../../../entities/contracts";
import { CategoryDTO } from "../Categories";

export type ProductDTO = DTO<{
    categories: CategoryDTO[];
    description: string;
}>;

export type IProduct = DatabaseEntity<ProductDTO>["Item"];
export type IProductsRepository = DatabaseEntity<ProductDTO>["Repository"];
