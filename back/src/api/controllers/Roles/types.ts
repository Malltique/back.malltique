import { Parameter } from "../../../contracts";
import {
    IRolesRepository,
    RoleDTO,
} from "../../../db/sqlite3/entities/Roles/types";

export type CreateRole = {
    Request: Parameter<IRolesRepository["create"]>;
};

export type GetRoles = {
    Response: RoleDTO[];
};
