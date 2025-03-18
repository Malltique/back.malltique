import { OnlyPrimitives, CreatePayload } from "../../../../entities/contracts";
import { DatabaseWithQueries } from "../../utils";
import { DELETE_ROLE_BY_ID, SELECT_ROLE_BY_ID, UPDATE_ROLE_BY_ID } from "./sql";
import { IRole, RoleDTO } from "./types";

export class Role implements IRole {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _id: number
    ) {}

    id: IRole["id"] = () => this._id;
    model: IRole["model"] = () =>
        this._database.getOne(SELECT_ROLE_BY_ID(this.id()));
    modify: IRole["modify"] = ({ name }) =>
        this._database.execute(UPDATE_ROLE_BY_ID(this.id(), name ?? ""));
    delete: IRole["delete"] = () =>
        this._database.execute(DELETE_ROLE_BY_ID(this.id()));
}
