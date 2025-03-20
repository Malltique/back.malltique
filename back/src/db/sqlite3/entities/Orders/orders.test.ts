import { prepareDB } from "../../..";
import { generateInMemoryDb } from "../../utils";
import { AllCategories } from "../Categories";
import { AllProducts } from "../Products/repositories";
import { AllUsers } from "../Users";
import { Order } from "./item";
import { AllOrders } from "./repositories";

const inMemoryDb = generateInMemoryDb();

beforeEach(async () => {
    await prepareDB(inMemoryDb);
    const users = new AllUsers(inMemoryDb);
    await users.create([
        {
            email: "test seller mail",
            name: "test seller",
            password: "",
            roles: [],
        },
    ]);
    const categories = new AllCategories(inMemoryDb);
    await categories.create([{ name: "electronics" }]);
    const products = new AllProducts(inMemoryDb);
    await products.create([
        {
            categories: [1],
            description: "test description",
            name: "test product",
            seller: 1,
        },
    ]);
});

test("Basic case", async () => {
    const orders = new AllOrders(inMemoryDb);
    await orders.create({
        productsData: [{ productId: 1, quantity: 33 }],
        userId: 1,
    });
    const order = new Order(inMemoryDb, 1);
    const model = await order.model();
    expect(model).toMatchObject({
        buyer: {
            email: "test seller mail",
            id: 1,
            name: "test seller",
            roles: [],
        },
        id: 1,
        data: [
            {
                quantity: 33,
                product: {
                    id: 1,
                    seller_id: 1,
                    name: "test product",
                    description: "test description",
                },
            },
        ],
    });
    await order.removeProduct(1, 3);
    const modelAfterRemoval = await order.model();
    expect(modelAfterRemoval.data[0].quantity === 30);
    await order.addProduct(1, 6);
    const modelAfterAdding = await order.model();
    expect(modelAfterAdding.data[0].quantity === 36);
});
