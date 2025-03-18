// import { DatabaseWithQueries } from "../../utils";
// import { forTable } from "../../utils/sqlHelpers";
// import { CategoriesRepository, CategoryDTO } from "../Categories";
// import { IProduct, ProductDTO } from "./types";

// const sql = forTable("Products");
// const categoriesLinkSql = forTable("ProductCategories");

// export class Product implements IProduct {
//     private constructor(
//         private readonly _database: DatabaseWithQueries,
//         private readonly _id: number
//     ) {}

//     public static WithId = (database: DatabaseWithQueries, id: number) => {
//         return new Product(database, id);
//     };

//     id: IProduct["id"] = () => this._id;

//     model: IProduct["model"] = async () => {
//         const { description, id, name } =
//             await this._database.selectOneFromDatabase<
//                 Pick<ProductDTO, "id" | "name" | "description">
//             >(sql.SELECT([`id = ${this.id()}`]));

//         const linksData = await this._database.selectFromDatabase<{
//             category_id: number;
//         }>(categoriesLinkSql.SELECT([`product_id = ${this.id()}`]));

//         const categoriesRepository = CategoriesRepository.WithIds(
//             this._database,
//             linksData.flatMap((x) => x.category_id)
//         );
//         const categories = await categoriesRepository.model();

//         return { categories, description, id, name };
//     };

//     modify: IProduct["modify"] = async (payload) => {
//         await this._database.executeCommand(
//             sql.UPDATE(payload, [`id = ${this.id()}`])
//         );
//     };

//     delete: IProduct["delete"] = async () => {
//         await this._database.executeCommand(sql.DELETE([`id = ${this.id()}`]));
//     };
// }
