import { generateInMemoryDb } from "../../utils";
import { AllCategories } from "../Categories";
import {
    DROP_CATEGORIES_TABLE,
    INITIALIZE_CATEGORIES_TABLE,
} from "../Categories/sql";
import { AllRoles } from "../Roles/repositories";
import { DROP_ROLES_TABLE, INITIALIZE_ROLES_TABLE } from "../Roles/sql";
import { AllUsers } from "../Users";
import {
    DROP_USER_ROLES_TABLE,
    DROP_USERS_TABLE,
    INITIALIZE_USER_ROLES_TABLE,
    INITIALIZE_USERS_TABLE,
} from "../Users/sql";
import { Product } from "./item";
import { AllProducts } from "./repositories";
import {
    DROP_PRODUCT_CATEGORIES_TABLE,
    DROP_PRODUCTS_TABLE,
    INITIALIZE_PRODUCT_CATEGORIES_TABLE,
    INITIALIZE_PRODUCTS_TABLE,
} from "./sql";

const inMemoryDb = generateInMemoryDb();

beforeEach(async () => {
    await inMemoryDb.execute(DROP_USERS_TABLE);
    await inMemoryDb.execute(DROP_ROLES_TABLE);
    await inMemoryDb.execute(DROP_USER_ROLES_TABLE);
    await inMemoryDb.execute(DROP_CATEGORIES_TABLE);
    await inMemoryDb.execute(DROP_PRODUCTS_TABLE);
    await inMemoryDb.execute(DROP_PRODUCT_CATEGORIES_TABLE);

    await inMemoryDb.execute(INITIALIZE_ROLES_TABLE);
    await inMemoryDb.execute(INITIALIZE_USERS_TABLE);
    await inMemoryDb.execute(INITIALIZE_USER_ROLES_TABLE);
    await inMemoryDb.execute(INITIALIZE_CATEGORIES_TABLE);
    await inMemoryDb.execute(INITIALIZE_PRODUCTS_TABLE);
    await inMemoryDb.execute(INITIALIZE_PRODUCT_CATEGORIES_TABLE);
});

test("Products basic case test", async () => {
    const roles = new AllRoles(inMemoryDb);
    const users = new AllUsers(inMemoryDb);
    const categories = new AllCategories(inMemoryDb);
    const products = new AllProducts(inMemoryDb);

    await roles.create([{ name: "seller" }]);
    await users.create([{ roles: [1], email: "admin mail", name: "admin" }]);
    await categories.create([{ name: "foods" }]);
    await products.create([
        {
            categories: [1],
            description: "Tasty sausage",
            name: "Sausage",
            seller: 1,
        },
    ]);

    const tastySausage = new Product(inMemoryDb, 1);
    const tastySausageModel = await tastySausage.model();

    expect(tastySausageModel).toMatchObject({
        categories: [{ id: 1, name: "foods" }],
        description: "Tasty sausage",
        id: 1,
        name: "Sausage",
        seller: { id: 1, name: "admin" },
    });

    await tastySausage.modify({ description: "VERY VERY VERY tasty sausage" });
    const tastySausageModelAfterModification = await tastySausage.model();
    expect(tastySausageModelAfterModification).toMatchObject({
        categories: [{ id: 1, name: "foods" }],
        description: "VERY VERY VERY tasty sausage",
        id: 1,
        name: "Sausage",
        seller: { id: 1, name: "admin" },
    });
});
