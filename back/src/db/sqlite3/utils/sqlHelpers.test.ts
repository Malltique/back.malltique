import { SQLHelpers } from ".";

let sql = SQLHelpers.forTable("Test");

test("Insert", () => {
  expect(sql.INSERT([{ a: 1 }, { a: 2 }])).toBe(
    `INSERT INTO Test (a) VALUES (1), (2)`
  );
});

test("Delete without clauses", () => {
  expect(sql.DELETE([])).toBe("DELETE Test");
});

test("Delete with clauses", () => {
  expect(sql.DELETE(["id = 4", "age = 55"])).toBe(
    "DELETE Test WHERE id = 4 AND age = 55"
  );
});
