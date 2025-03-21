import { Parameter } from "../../../contracts";
import {
    IProductsRepository,
    ListProductDTO,
} from "../../../db/sqlite3/entities";

export type GetAllProducts = {
    Response: ListProductDTO[];
};

export type CreateProducts = {
    Request: Parameter<IProductsRepository["create"]>;
};
