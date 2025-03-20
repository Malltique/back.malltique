import {
    DatabaseEntity,
    DTO,
    Identified,
    Named,
} from "../../../../entities/contracts";
import { CategoryDTO } from "../Categories";

export type ProductDTO = DTO<{
    categories: CategoryDTO[];
    seller: Identified & Named;
    description: string;
}>;

export type ListProductDTO = Identified & Named & { description: string };

export type IProduct = DatabaseEntity<ProductDTO>["Item"];
export type IProductsRepository = Omit<
    DatabaseEntity<ProductDTO>["Repository"],
    "model"
> & {
    listModel: () => Promise<Array<ListProductDTO>>;
};
