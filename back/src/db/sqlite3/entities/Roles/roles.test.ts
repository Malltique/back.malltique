import { generateInMemoryDb } from "../../utils";
import { Role } from "./item";
import { RolesWithIds } from "./repositories";
import { AllRoles } from "./repositories/AllRoles";
import { DROP_ROLES_TABLE, INITIALIZE_ROLES_TABLE } from "./sql";

const inMemoryDb = generateInMemoryDb();

beforeEach(async () => {
    await inMemoryDb.execute(DROP_ROLES_TABLE);
    await inMemoryDb.execute(INITIALIZE_ROLES_TABLE);
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

test("Roles by ids", async () => {
    const roles = new AllRoles(inMemoryDb);
    await roles.create([
        { name: "user" },
        { name: "seller" },
        { name: "admin" },
    ]);
    const rolesWithIds = new RolesWithIds(inMemoryDb, [1, 2]);
    const model = await rolesWithIds.model();
    expect(model).toMatchObject([
        { id: 1, name: "user" },
        { id: 2, name: "seller" },
    ]);
    await rolesWithIds.deleteAll();

    const modelAfterDeletion = await roles.model();
    expect(modelAfterDeletion).toMatchObject([{ id: 3, name: "admin" }]);
});
