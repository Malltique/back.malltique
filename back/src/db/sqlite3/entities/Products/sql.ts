export const INITIALIZE_TABLES = [
    `
    CREATE TABLE IF NOT EXISTS Products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL
  )`,
    `
    CREATE TABLE IF NOT EXISTS ProductCategories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        category_id INTEGER,
        FOREIGN KEY (product_id) REFERENCES Products(id),
        FOREIGN KEY (category_id) REFERENCES Categories(id),
    )
  `,
];
