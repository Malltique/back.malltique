import { DTO } from "../../../../entities/contracts";
import { RoleDTO } from "../Roles/types";

export type UserDTO = DTO<{ email: string; roles: RoleDTO[] }>;
