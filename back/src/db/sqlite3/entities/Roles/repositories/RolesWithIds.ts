import { DatabaseWithQueries } from "../../../utils";
import { DELETE_ROLES_BY_IDS, SELECT_ROLES_BY_IDS } from "../sql";
import { IRolesRepository } from "../types";
import { AllRoles } from "./AllRoles";

export class RolesWithIds implements IRolesRepository {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _ids: number[]
    ) {}

    model: IRolesRepository["model"] = () => {
        return this._database.getAll(SELECT_ROLES_BY_IDS(this._ids));
    };
    create: IRolesRepository["create"] = new AllRoles(this._database).create;

    deleteAll: IRolesRepository["deleteAll"] = () => {
        return this._database.execute(DELETE_ROLES_BY_IDS(this._ids));
    };
}
