import { generateInMemoryDb } from "../../utils";
import { AllRoles } from "../Roles/repositories/AllRoles";
import { DROP_ROLES_TABLE, INITIALIZE_ROLES_TABLE } from "../Roles/sql";
import { User } from "./item";
import { AllUsers } from "./repositories/AllUsers";
import {
    DROP_USER_ROLES_TABLE,
    DROP_USERS_TABLE,
    INITIALIZE_USER_ROLES_TABLE,
    INITIALIZE_USERS_TABLE,
} from "./sql";

const inMemoryDb = generateInMemoryDb();

beforeEach(async () => {
    await inMemoryDb.execute(DROP_ROLES_TABLE);
    await inMemoryDb.execute(DROP_USERS_TABLE);
    await inMemoryDb.execute(DROP_USER_ROLES_TABLE);

    await inMemoryDb.execute(INITIALIZE_ROLES_TABLE);
    await inMemoryDb.execute(INITIALIZE_USERS_TABLE);
    await inMemoryDb.execute(INITIALIZE_USER_ROLES_TABLE);
});

test("Users", async () => {
    const allRoles = new AllRoles(inMemoryDb);
    await allRoles.create([{ name: "admin" }, { name: "seller" }]);
    const allUsers = new AllUsers(inMemoryDb);
    await allUsers.create([
        {
            name: "user",
            email: "user@user.user",
            roles: [1, 2],
            password: "hello",
        },
    ]);
    const user = new User(inMemoryDb, 1);
    const userModel = await user.model();
    expect(userModel).toMatchObject({
        id: 1,
        name: "user",
        email: "user@user.user",
        roles: [
            { id: 1, name: "admin" },
            { id: 2, name: "seller" },
        ],
    });

    await user.modify({ email: "new mail", name: "new name" });
    const modelAfterModification = await user.model();

    expect(modelAfterModification).toMatchObject({
        id: 1,
        name: "new name",
        email: "new mail",
        roles: [
            { id: 1, name: "admin" },
            { id: 2, name: "seller" },
        ],
    });
});

test("Login", async () => {
    const users = new AllUsers(inMemoryDb);
    await users.create([
        { email: "test_mail", name: "name", password: "password", roles: [] },
    ]);
    const nonExistentUser = await users.login(
        "non existent user",
        "very wrong password"
    );
    expect(nonExistentUser).toMatchObject([undefined, "Not found"]);
    const existingEmailWithWrongPassword = await users.login(
        "test_mail",
        "very wrong password"
    );
    expect(existingEmailWithWrongPassword).toMatchObject([
        undefined,
        "Wrong password",
    ]);
    const success = await users.login("test_mail", "password");
    expect(success).toMatchObject([{ email: "test_mail" }, "Found"]);
});
