import { DatabaseWithQueries, SQLHelpers } from "../../utils";
import { ICategory, CategoryDTO } from "./types";

const sql = SQLHelpers.forTable("Categories");

export class Category implements ICategory {
  private constructor(
    private readonly _database: DatabaseWithQueries,
    private readonly _id: number
  ) {}

  public static WithId = (database: DatabaseWithQueries, id: number) => {
    return new Category(database, id);
  };

  id: ICategory["id"] = () => {
    return this._id;
  };

  model: ICategory["model"] = async () => {
    const result = await this._database.selectOneFromDatabase<CategoryDTO>(
      sql.SELECT([`id = ${this._id}`])
    );

    return result;
  };

  delete: ICategory["delete"] = () => {
    return this._database.executeCommand(sql.DELETE([`id = ${this.id()}`]));
  };

  modify: ICategory["modify"] = (payload) => {
    const a = sql.UPDATE(payload, [`id = ${this.id()}`]);
    console.log("🚀 ~ Category ~ a:", a);
    return this._database.executeCommand(
      sql.UPDATE(payload, [`id = ${this.id()}`])
    );
  };
}
