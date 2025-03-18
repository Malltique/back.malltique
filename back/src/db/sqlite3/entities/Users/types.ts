import { DatabaseEntity, DTO } from "../../../../entities/contracts";
import { RoleDTO } from "../Roles/types";

export type UserDTO = DTO<{ email: string; roles: RoleDTO[] }>;
export type IUser = DatabaseEntity<UserDTO>["Item"];
export type IUsersRepository = Pick<
    DatabaseEntity<UserDTO>["Repository"],
    "create"
>;
