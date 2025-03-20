import { DatabaseEntity, DTO } from "../../../../contracts";
import { RoleDTO } from "../Roles/types";

export type UserDTO = DTO<{
    email: string;
    roles: RoleDTO[];
}>;
export type IUser = DatabaseEntity<UserDTO>["Item"];
export type IUsersRepository = Pick<
    DatabaseEntity<UserDTO, { password: string }>["Repository"],
    "create"
> & {
    login: (
        email: string,
        password: string
    ) => Promise<
        [UserDTO | undefined, "Found" | "Not found" | "Wrong password"]
    >;
};
