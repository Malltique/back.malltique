import { DatabaseEntity, DTO } from "../../../../contracts";

export type Roles = "user" | "seller" | "admin";

export type RoleDTO = DTO<{}, Roles>;
export type IRole = DatabaseEntity<RoleDTO>["Item"];
export type IRolesRepository = DatabaseEntity<RoleDTO>["Repository"];
