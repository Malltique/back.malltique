// import { DatabaseWithQueries } from "../../utils";
// import { forTable } from "../../utils/sqlHelpers";
// import { CategoryDTO } from "../Categories";
// import { Product } from "./item";
// import { IProductsRepository, ProductDTO } from "./types";

// const sql = forTable("Products");
// const categoriesLinkSql = forTable("ProductCategories");

// export class ProductsRepository implements IProductsRepository {
//     private constructor(
//         private readonly _database: DatabaseWithQueries,
//         private readonly _clauses: string[]
//     ) {}

//     public static FromCategories = (
//         database: DatabaseWithQueries,
//         categoryIds: number[]
//     ) => {};

//     model: IProductsRepository["model"] = async () => {
//         const product_ids = await this._database.selectFromDatabase<{
//             id: number;
//         }>(sql.SELECT(this._clauses, "OR", "id"));

//         const products = product_ids.map(({ id }) =>
//             Product.WithId(this._database, id)
//         );
//         const result = await Promise.all(products.map((x) => x.model()));

//         return result;
//     };
//     create: IProductsRepository["create"] = (payload) => {};
//     deleteAll: () => Promise<void>;
// }
