import { DatabaseWithQueries } from "../../../utils";
import { INSERT_USER, INSERT_USER_ROLES, SELECT_USER_BY_EMAIL } from "../sql";
import { IUsersRepository, UserDTO } from "../types";
import bcrypt from "bcrypt";

export class AllUsers implements IUsersRepository {
    public constructor(private readonly _database: DatabaseWithQueries) {}

    create: IUsersRepository["create"] = async (payload) => {
        const promise = Promise.all(
            payload.map(async (x) => {
                const hashedPassword = await bcrypt.hash(x.password, 10);

                const insertUser = await this._database.execute(
                    INSERT_USER({ ...x, password: hashedPassword })
                );

                if (x.roles?.length) {
                    return this._database.execute(
                        INSERT_USER_ROLES(x, insertUser.lastID)
                    );
                }

                return insertUser;
            })
        );

        return promise;
    };

    login: IUsersRepository["login"] = async (email, password) => {
        const userData = await this._database.getOne<
            UserDTO & { hashed_password: string }
        >(SELECT_USER_BY_EMAIL(email));

        if (!userData) {
            return [undefined, "Not found"] as const;
        }

        const match = await bcrypt.compare(password, userData.hashed_password);

        if (!match) {
            return [undefined, "Wrong password"];
        }

        return [
            {
                email: userData.email,
                id: userData.id,
                name: userData.name,
                roles: userData.roles,
            },
            "Found",
        ];
    };
}
