const { client } = require("./client");

async function createOrder({
  completePurchase,
  userId,
  productId,
  itemPrice,
  quantity,
}) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `

    INSERT INTO orders ("completePurchase", "userId", "productId", "itemPrice", "quantity")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `,
      [completePurchase, userId, productId, itemPrice, quantity]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrderQuantity({ id, quantity }) {
  
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      UPDATE orders
      SET quantity=$1
      WHERE id=$2
      RETURNING *;
      `,
      [quantity, id]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrdersById(id) {
  try {
    const { rows: order } = await client.query(
      `
          SELECT *
          FROM orders
          WHERE id = $1
          `,

      [id]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(`
          SELECT *
          FROM orders
          `);

    return orders;
  } catch (error) {
    throw error;
  }
}

async function getOrdersByUser({ id }) {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT * FROM orders
      WHERE "userId" = $1
      `,
      [id]
    );
    
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getCartByUser(userId, productId) {
  
  try {
    const { rows: cart } = await client.query(
      `
      SELECT orders.id AS "orderId", orders.quantity AS "orderQuantity", products.title, products.imgurl, products.price, products.quantity, products.id
      FROM orders
      JOIN products on orders."productId" = products.id
      WHERE "userId" = $1 AND "completePurchase" = false;
      `,
      [userId]
    );
    
    return cart;
  } catch (error) {
    throw error;
  }
}

async function destroyCart(userId) {
  try {
    const { rows: cart } = await client.query(
      `
      DELETE FROM orders
      WHERE "userId" = $1 AND 
      "completePurchase" = false;     
      `,
      [userId]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(orderId) {
  try {
    const { rows: order } = await client.query(
      ` 
      DELETE FROM orders 
      WHERE id=$1 
      RETURNING *;
      `,
      [orderId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  destroyCart,
  updateOrderQuantity,
  createOrder,
  getOrdersById,
  getCartByUser,
  getOrdersByUser,
  getAllOrders,
  deleteOrder,
};
