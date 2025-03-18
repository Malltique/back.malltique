import { CreatePayload } from "../../../../../entities/contracts";
import { DatabaseWithQueries } from "../../../utils";
import { INSERT_USER, INSERT_USER_ROLES } from "../sql";
import { IUsersRepository, UserDTO } from "../types";

export class AllUsers implements IUsersRepository {
    public constructor(private readonly _database: DatabaseWithQueries) {}

    create: IUsersRepository["create"] = async (payload) => {
        const promise = Promise.all(
            payload.map(async (x) => {
                const insertUser = await this._database.execute(INSERT_USER(x));

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
}
