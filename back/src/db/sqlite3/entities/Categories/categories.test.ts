import { DROP_CATEGORIES_TABLE, INITIALIZE_CATEGORIES_TABLE } from "./sql";
import { AllCategories } from "./repositories/AllCategories";
import { generateInMemoryDb } from "../../utils";
import { Category } from "./item";
import { prepareDB } from "../../..";

const inMemoryDb = generateInMemoryDb();

beforeEach(async () => {
    await prepareDB(inMemoryDb);
});

test("All categories repository", async () => {
    const allCategories = new AllCategories(inMemoryDb);
    const beforeInsert = await allCategories.model();
    expect(beforeInsert).toMatchObject([]);
    await allCategories.create([{ name: "electronics" }, { name: "foods" }]);
    const afterInsert = await allCategories.model();
    expect(afterInsert).toMatchObject([
        { id: 1, name: "electronics" },
        { id: 2, name: "foods" },
    ]);
    await allCategories.deleteAll();
    const afterDeletion = await allCategories.model();
    expect(afterDeletion).toMatchObject([]);
});

test("One category by id", async () => {
    const allCategories = new AllCategories(inMemoryDb);
    await allCategories.create([{ name: "electronics" }]);
    const category = new Category(inMemoryDb, 1);
    const beforeModify = await category.model();
    expect(beforeModify).toMatchObject({ id: 1, name: "electronics" });
    await category.modify({ name: "foods" });
    const afterModify = await category.model();
    expect(afterModify).toMatchObject({ id: 1, name: "foods" });
    await category.delete();
    const emptyCategories = await allCategories.model();
    expect(emptyCategories).toMatchObject([]);
});
