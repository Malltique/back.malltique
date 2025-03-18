import { DatabaseWithQueries } from "../../utils";
import { RolesWithIds } from "../Roles/repositories";
import {
    DELETE_USER_BY_ID,
    SELECT_ROLE_IDS_FOR_USER,
    SELECT_USER_BY_ID,
    UPDATE_USER_BY_ID,
} from "./sql";
import { IUser, UserDTO } from "./types";

export class User implements IUser {
    public constructor(
        private readonly _database: DatabaseWithQueries,
        private readonly _id: number
    ) {}

    id: IUser["id"] = () => this._id;

    model: IUser["model"] = async () => {
        const userRoleIds = await this._database.getAll<{ role_id: number }>(
            SELECT_ROLE_IDS_FOR_USER(this.id())
        );

        const rolesWithIds = new RolesWithIds(
            this._database,
            userRoleIds.flatMap((x) => x.role_id)
        );
        const roles = await rolesWithIds.model();
        const userModel = await this._database.getOne<Omit<UserDTO, "roles">>(
            SELECT_USER_BY_ID(this.id())
        );

        return { ...userModel, roles };
    };

    modify: IUser["modify"] = (payload) => {
        return this._database.execute(UPDATE_USER_BY_ID(this._id, payload));
    };

    delete: IUser["delete"] = () => {
        return this._database.execute(DELETE_USER_BY_ID(this.id()));
    };
}
