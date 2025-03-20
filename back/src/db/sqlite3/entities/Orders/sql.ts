export const INITIALIZE_ORDERS_TABLE = [
    `
        CREATE TABLE IF NOT EXISTS Orders (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
        ) 
    `,
    undefined,
] as const;

export const INITIALIZE_ORDER_PRODUCTS_TABLE = [
    `
        CREATE TABLE IF NOT EXISTS OrderProducts (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL,
            quantity INTEGER NOT NULL,
            FOREIGN KEY (product_id) REFERENCES Products(id) ON DELETE CASCADE
        )
    `,
    undefined,
] as const;

export const DROP_ORDERS_TABLE = [
    `DROP TABLE IF EXISTS Orders`,
    undefined,
] as const;

export const DROP_ORDER_PRODUCTS_TABLE = [
    `DROP TABLE IF EXISTS OrderProducts`,
    undefined,
] as const;

export const SELECT_PRODUCTS_DATA_BY_ORDER_ID = (orderId: number) =>
    [
        `SELECT product_id, quantity FROM OrderProducts WHERE order_id = ?`,
        [orderId],
    ] as const;

export const SELECT_USER_ID_BY_ORDER_ID = (orderId: number) =>
    [
        `
            SELECT user_id FROM Products WHERE id = ?
        `,
        [orderId],
    ] as const;

export const SELECT_PRODUCT_QUANTITY_IN_ORDER = (
    orderId: number,
    productId: number
) =>
    [
        `
            SELECT quantity FROM OrderProducts WHERE order_id = ? AND product_id = ?
        `,
        [orderId, productId],
    ] as const;

export const REMOVE_PRODUCT_FROM_ORDER = (orderId: number, productId: number) =>
    [
        "REMOVE FROM OrderProducts WHERE order_id = ? AND product_id = ?",
        [orderId, productId],
    ] as const;

export const UPDATE_PRODUCT_QUANTITY_IN_ORDER = (
    orderId: number,
    productId: number,
    quantity: number
) =>
    [
        "UPDATE OrderProducts SET quantity = ? WHERE product_id = ? AND order_id = ?",
        [quantity, productId, orderId],
    ] as const;

export const INSERT_PRODUCT_IN_ORDER = (
    orderId: number,
    productId: number,
    initialQuantity: number
) =>
    [
        "INSERT INTO OrderProducts (order_id, product_id, quantity) VALUES (?, ?, ?)",
        [orderId, productId, initialQuantity],
    ] as const;
