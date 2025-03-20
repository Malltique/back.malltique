import { prepareDB } from "../../..";
import { generateInMemoryDb } from "../../utils";
import { AllCategories } from "../Categories";
import { AllRoles } from "../Roles/repositories";
import { AllUsers } from "../Users";
import { Product } from "./item";
import { AllProducts } from "./repositories";
import { ProductsWithIds } from "./repositories/ProductsWithIds";

const inMemoryDb = generateInMemoryDb();

beforeEach(async () => {
    await prepareDB(inMemoryDb);

    const roles = new AllRoles(inMemoryDb);
    const users = new AllUsers(inMemoryDb);
    const categories = new AllCategories(inMemoryDb);

    await roles.create([{ name: "seller" }]);
    await users.create([
        {
            roles: [1],
            email: "admin mail",
            name: "admin",
            password: "password",
        },
    ]);
    await categories.create([{ name: "foods" }]);
});

test("Products basic case test", async () => {
    const products = new AllProducts(inMemoryDb);

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

test("Products by ids", async () => {
    const products = new AllProducts(inMemoryDb);

    await products.create([
        {
            categories: [1],
            description: "Tasty sausage",
            name: "Sausage",
            seller: 1,
        },
        {
            categories: [1],
            description: "Tasty brownie",
            name: "Brownie",
            seller: 1,
        },
    ]);

    const firstTwoProducts = new ProductsWithIds(inMemoryDb, [1, 2]);
    const model = await firstTwoProducts.listModel();

    expect(model).toMatchObject([
        {
            id: 1,
            seller_id: 1,
            name: "Sausage",
            description: "Tasty sausage",
        },
        {
            id: 2,
            seller_id: 1,
            name: "Brownie",
            description: "Tasty brownie",
        },
    ]);

    await firstTwoProducts.deleteAll();

    const modelAfterDeletion = await products.listModel();

    expect(modelAfterDeletion).toMatchObject([]);
});
