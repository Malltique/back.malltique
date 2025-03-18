import { DELETE_ALL_CATEGORIES, INITIALIZE_CATEGORIES_TABLE } from "./sql";
import { AllCategories } from "./repositories/AllCategories";
import { generateInMemoryDb } from "../../utils";

const inMemoryDb = generateInMemoryDb();

beforeAll(() => {
    inMemoryDb.execute([INITIALIZE_CATEGORIES_TABLE, undefined]);
});

beforeEach(() => {
    inMemoryDb.execute(DELETE_ALL_CATEGORIES);
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
