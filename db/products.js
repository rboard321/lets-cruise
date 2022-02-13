const { client } = require("./client");

async function getProductsById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        SELECT * FROM products
        WHERE id = $1
        `,
      [id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
        SELECT *
        FROM products
        `);

    return products;
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  title,
  description,
  price,
  imgurl,
  category,
  quantity,
  inStock,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO products (title, description, price, imgurl, category, quantity, inStock)
        VALUES($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `,
      [title, description, price, imgurl, category, quantity, inStock]
    );
    console.log('new product created....', product)
    return product;
  } catch (error) {
    throw error;
  }
}

async function updateProduct({ title, description, price, imgurl, category }) {
  try {
    const { rows: products } = await client.query(
      `
          UPDATE products
          SET title = $1,
          description = $2,  
          price= $3, 
          imgurl = $4, 
          category = $5, 
      `,
      [title, description, price, imgurl, category]
    );
    return products;
  } catch {}
}

module.exports = {
  getProductsById,
  getAllProducts,
  createProduct,
  updateProduct,
};
