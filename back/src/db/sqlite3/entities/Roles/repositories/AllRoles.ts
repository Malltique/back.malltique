import { DatabaseWithQueries } from "../../../utils";
import { DELETE_ALL_ROLES, INSERT_ROLES, SELECT_ALL_ROLES } from "../sql";
import { IRolesRepository } from "../types";

export class AllRoles implements IRolesRepository {
    public constructor(private readonly _database: DatabaseWithQueries) {}
    model: IRolesRepository["model"] = () => {
        return this._database.getAll(SELECT_ALL_ROLES);
    };
    create: IRolesRepository["create"] = (payload) => {
        return this._database.execute(
            INSERT_ROLES(payload.flatMap((x) => x.name))
        );
    };
    deleteAll: IRolesRepository["deleteAll"] = () => {
        return this._database.execute(DELETE_ALL_ROLES);
    };
}
