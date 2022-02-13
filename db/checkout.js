const { client } = require("./client");

async function createCheckout({
  userId,
  firstName,
  lastName,
  street,
  city,
  state,
  zip,
  creditCardNumber,
  phone,
  creditCardExp,
  creditValidationNumber,
  orders,
}) {
  try {
    const {
      rows: [checkoutId],
    } = await client.query(
      `
        INSERT INTO checkout (
        "userId","firstName", "lastName", street, city , 
        state, zip, phone, "creditCardNumber",
        "creditCardExp","creditValidationNumber"
        )
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *;
        `,
      [
        userId,
        firstName,
        lastName,
        street,
        city,
        state,
        zip,
        phone,
        creditCardNumber,
        creditCardExp,
        creditValidationNumber,
      ]
    );
  } catch (error) {
    throw error;
  }
}

async function getAllCheckouts() {
  try {
    const { rows: checkout } = await client.query(`
        SELECT *
        FROM checkout
        `);
    return checkout;
  } catch (error) {
    throw error;
  }
}

async function getAllCheckoutsByUserId({ userId }) {
  try {
    const { rows: checkout } = await client.query(
      `
        SELECT *
        FROM checkout
        WHERE "userId"= $1;
        `,
      [userId]
    );

    return checkout;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createCheckout,
  getAllCheckouts,
  getAllCheckoutsByUserId,
};
