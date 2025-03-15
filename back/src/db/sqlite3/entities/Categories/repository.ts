import { DatabaseWithQueries, SQLHelpers } from "../../utils";
import { ICategoriesRepository, CategoryDTO } from "./types";

const sql = SQLHelpers.forTable("Categories");

export class CategoriesRepository implements ICategoriesRepository {
  private constructor(
    private readonly _database: DatabaseWithQueries,
    private readonly _whereClauses: string[] = []
  ) {}

  public static All(database: DatabaseWithQueries) {
    return new CategoriesRepository(database);
  }

  public static ByType(
    database: DatabaseWithQueries,
    type: CategoryDTO["name"]
  ) {
    return new CategoriesRepository(database, [`Type = ${type}`]);
  }

  model: () => Promise<CategoryDTO[]> = async () => {
    const databaseResponse =
      await this._database.selectFromDatabase<CategoryDTO>(
        sql.SELECT(this._whereClauses)
      );

    return databaseResponse;
  };

  create: ICategoriesRepository["create"] = (payload) => {
    return this._database.executeCommand(sql.INSERT([payload]));
  };

  deleteAll: ICategoriesRepository["deleteAll"] = () => {
    return this._database.executeCommand(sql.DELETE(this._whereClauses));
  };
}
