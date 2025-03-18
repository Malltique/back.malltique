import { generateInMemoryDb } from "../../utils";
import { Role } from "./item";
import { AllRoles } from "./repositories/AllRoles";
import { DROP_ROLES_TABLE, INITIALIZE_ROLES_TABLE } from "./sql";

const inMemoryDb = generateInMemoryDb();

beforeEach(() => {
    inMemoryDb.execute(DROP_ROLES_TABLE);
    inMemoryDb.execute(INITIALIZE_ROLES_TABLE);
});

test("All roles", async () => {
    const roles = new AllRoles(inMemoryDb);
    const beforeInsert = await roles.model();
    expect(beforeInsert).toMatchObject([]);
    await roles.create([
        { name: "user" },
        { name: "seller" },
        { name: "admin" },
    ]);
    const afterInsert = await roles.model();
    expect(afterInsert).toMatchObject([
        { id: 1, name: "user" },
        { id: 2, name: "seller" },
        { id: 3, name: "admin" },
    ]);
    await roles.deleteAll();
    const afterDeletion = await roles.model();
    expect(afterDeletion).toMatchObject([]);
});

test("One role", async () => {
    const roles = new AllRoles(inMemoryDb);
    await roles.create([
        { name: "user" },
        { name: "seller" },
        { name: "admin" },
    ]);
    const userRole = new Role(inMemoryDb, 1);
    const roleData = await userRole.model();
    expect(roleData).toMatchObject({ id: 1, name: "user" });
    await userRole.modify({ name: "seller" });
    const roleDataAfterRename = await userRole.model();
    expect(roleDataAfterRename).toMatchObject({ id: 1, name: "seller" });
    await userRole.delete();
    const rolesAfterDeletion = await roles.model();
    expect(rolesAfterDeletion).toMatchObject([
        { id: 2, name: "seller" },
        { id: 3, name: "admin" },
    ]);
});
