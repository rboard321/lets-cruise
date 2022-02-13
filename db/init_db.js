// code to build and initialize DB goes here

const { client } = require("./client");
const { createProduct, createOrder, getOrdersByUser } = require("./");
const { createCheckout } = require("./checkout");
const { createUser } = require("./users");
const { getCartByUser } = require("./orders");

console.log(client);
async function dropTables() {
  try {
    // drop tables in correct order
    console.log("starting to drop tables...");
    await client.query(`
    DROP TABLE IF EXISTS checkout;
    DROP TABLE IF EXISTS order_products;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
    `);
    console.log("Finished dropping tables!");
  } catch (error) {
    console.error("Error dropping tables!");
    throw error;
  }
}
// build tables in correct order
async function createTables() {
  try {
    console.log("Starting to build tables...");
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    "firstName" VARCHAR(255) NOT NULL,
                    "lastName" VARCHAR(255) NOT NULL,
                    email VARCHAR(255) UNIQUE NOT NULL, 
                    username VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    "isAdmin" BOOLEAN DEFAULT false
                    
             );
             CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                price VARCHAR(255),
                "imgurl" VARCHAR(255),
                "instock" BOOLEAN,
                quantity VARCHAR(255),
                category VARCHAR(255)
             );
             CREATE TABLE orders(
                 id SERIAL PRIMARY KEY,
                 "completePurchase" BOOLEAN DEFAULT false,
                 "userId" INTEGER REFERENCES users(id),
                 "itemPrice" INTEGER,
                 "quantity" INTEGER NOT NULL,
                "productId" INTEGER REFERENCES products(id)
                 
             );
             CREATE TABLE order_products(
              "productId" INTEGER REFERENCES products(id),
              "orderId" INTEGER REFERENCES orders(id),
              price VARCHAR(255),
              quantity VARCHAR(255)
          );
          CREATE TABLE checkout(
            id SERIAL PRIMARY KEY, 
            "userId" INTEGER REFERENCES users(id),
            "firstName" VARCHAR(255) NOT NULL,
            "lastName" VARCHAR(255) NOT NULL,
            street VARCHAR(255) NOT NULL,
            city VARCHAR(255) NOT NULL,
            state VARCHAR(255) NOT NULL,
            zip VARCHAR(255) NOT NULL,
            phone VARCHAR(255) NOT NULL,
            "creditCardNumber" VARCHAR(255) NOT NULL,
            "creditCardExp" VARCHAR(255) NOT NULL,
            "creditValidationNumber" VARCHAR(255) NOT NULL,
            "paymentComplete" BOOLEAN DEFAULT true
            );

             `);
    console.log("Finished building tables!");
  } catch (error) {
    console.log("Error building tables");
    throw error;
  }
}

async function populateInitialData() {
  try {
    console.log("creating products");
    await createProduct({
      title: "Gray Fixie",
      description: "Beginner Friendly",
      price: 200,
      imgurl:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
      category: "road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Elpis",
      description: "From Eorzea",
      price: 500,
      imgurl:
        "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Shadowbringer",
      description: "Advanced users",
      price: 600,
      imgurl:
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1644&q=80",
      category: "off road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Pokemon Battle Bike",
      description: "For Pokemon fans",
      price: 800,
      imgurl:
        "https://i.pinimg.com/originals/3a/7a/3a/3a7a3afd594cb6cb0212d891b9212166.jpg",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Heavensward",
      description: "Very loud on the road",
      price: 400,
      imgurl:
        "https://images.unsplash.com/photo-1505705694340-019e1e335916?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80",
      category: "off road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Black and Gray Stone",
      description: "Outstanding Finish",
      price: 300,
      imgurl:
        "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=836&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Gray Mountain",
      description: "Great for Hikes",
      price: 450,
      imgurl:
        "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Gray Thin Mint",
      description: "Crayola Box art",
      price: 550,
      imgurl:
        "https://images.unsplash.com/photo-1570169043013-de63774bbf97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "off road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Blue Basket",
      description: "Carry a Cat in it ",
      price: 400,
      imgurl:
        "https://images.unsplash.com/photo-1591047139334-337807f2b3e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Black Comet",
      description: "Look at the stars",
      price: 700,
      imgurl:
        "https://images.unsplash.com/photo-1559348349-86f1f65817fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "off road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Gold Dust",
      description: "Very breezy",
      price: 300,
      imgurl:
        "https://images.unsplash.com/photo-1487803836022-91054ca05fdd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
      category: "off road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Ice-Cream Wheels",
      description: "Perfect for a hot summer day",
      price: 450,
      imgurl:
        "https://images.unsplash.com/photo-1571333247701-6bb4d7314edd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Granola Hill",
      description: "Fitness Addicts",
      price: 530,
      imgurl:
        "https://images.unsplash.com/photo-1616963248328-6b7bea589840?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
      category: "road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Super Saiyan",
      description: "Not Over 9000",
      price: 275,
      imgurl:
        "https://images.unsplash.com/photo-1571333250630-f0230c320b6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Simple and Complex",
      description: "Very clean",
      price: 460,
      imgurl:
        "https://images.unsplash.com/photo-1594171799689-5a716fd3acd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Green Mint",
      description: "Freshmaker",
      price: 300,
      imgurl:
        "https://images.unsplash.com/photo-1502123909989-c9d05c43046a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1933&q=80",
      category: "road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Sand Bar",
      description: "Take it to the Beach",
      price: 190,
      imgurl:
        "https://images.unsplash.com/photo-1571333250176-3c316199994b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      category: "off road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Flagship",
      description: "Very Popular",
      price: 400,
      imgurl:
        "https://images.unsplash.com/photo-1555002377-0d00a8592594?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1752&q=80",
      category: "road bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Flower Basket",
      description: "Beautiful Flowers not included",
      price: 490,
      imgurl:
        "https://images.unsplash.com/photo-1597937913608-8a1d77dd0fe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "Urban Way",
      description: "Spotted in Midgar",
      price: 570,
      imgurl:
        "https://images.unsplash.com/photo-1558190596-69daf12cf424?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });
    await createProduct({
      title: "City Life",
      description: "Atlanta favorite",
      price: 320,
      imgurl:
        "https://images.unsplash.com/photo-1567820844409-70bd8b09da06?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80",
      category: "city bike",
      quantity: 1000,
      inStock: true,
    });

    console.log("Finished creating products");
    console.log("creating users");
    await createUser({
      firstName: "ricky",
      lastName: "techno",
      email: "ricky_b@me.com",
      username: "rboard4321",
      password: "stanley2345",
      isAdmin: false,
    });
    await createUser({
      firstName: "Noel",
      lastName: "Board",
      email: "Noel@me.com",
      username: "noelb",
      password: "password1234",
      isAdmin: true,
    });
    await createUser({
      firstName: "brian",
      lastName: "starfish",
      email: "brian@me.com",
      username: "brian432",
      password: "cat5437623",
      isAdmin: false,
    });
    await createUser({
      firstName: "Chris",
      lastName: "goldfin",
      email: "Chris@me.com",
      username: "chris875273",
      password: "chris8376473",
      isAdmin: false,
    });
    await createUser({
      firstName: "Jay",
      lastName: "sharkfin",
      email: "Jay@me.com",
      username: "jay75632",
      password: "jay67364",
      isAdmin: false,
    });
    await createUser({
      firstName: "Asmon",
      lastName: "Gold",
      email: "Asmon@me.com",
      username: "Asmon2998",
      password: "bald57683",
      isAdmin: false,
    });
    await createUser({
      firstName: "Eorzea",
      lastName: "Fantasy",
      email: "Eorzea@me.com",
      username: "Eorzea596",
      password: "light5930",
      isAdmin: false,
    });
    await createUser({
      firstName: "Knight",
      lastName: "Dragoon",
      email: "knight@me.com",
      username: "knight369",
      password: "lance59306",
      isAdmin: false,
    });
    await createUser({
      firstName: "Bard",
      lastName: "Arrow",
      email: "Bard@me.com",
      username: "Bard03693",
      password: "arrow9363",
      isAdmin: false,
    });
    await createUser({
      firstName: "Kermit",
      lastName: "Muppet",
      email: "Kermit@me.com",
      username: "green8530",
      password: "real59683",
      isAdmin: false,
    });

    console.log("Finished creating users");
    console.log("creating Orders");
    await createOrder({
      completePurchase: false,
      userId: 2,
      productId: 1,
      itemPrice: 600,
      quantity: 3,
    });
    await createOrder({
      completePurchaes: false,
      userId: 1,
      productId: 3,
      itemPrice: 400,
      quantity: 5,
    });
    await createOrder({
      completePurchase: false,
      userId: 2,
      productId: 2,
      itemPrice: 700,
      quantity: 8,
    });
    await createOrder({
      completePurchase: false,
      userId: 3,
      productId: 3,
      itemPrice: 400,
      quantity: 5,
    });
    await createOrder({
      completePurchase: false,
      userId: 4,
      productId: 4,
      itemPrice: 200,
      quantity: 3,
    });
    await createOrder({
      completePurchase: false,
      userId: 5,
      productId: 5,
      itemPrice: 550,
      quantity: 2,
    });
    await createOrder({
      completePurchase: false,
      userId: 6,
      productId: 6,
      itemPrice: 230,
      quantity: 4,
    });
    await createOrder({
      completePurchase: false,
      userId: 7,
      productId: 7,
      itemPrice: 800,
      quantity: 4,
    });
    console.log("finished creating orders");
    console.log("get orders by user");
    await getOrdersByUser(2);
    console.log("finish get orders by user");
    console.log("get cart by user");
    await getCartByUser(1);
    console.log("finish get cart by user");
    //checkout
    console.log("starting to create checkout...");
    await createCheckout(
      {
        userId: 1,
        firstName: "Brain",
        lastName: "Strife",
        street: "7 Fantasy Lane",
        city: "Atlanta",
        state: "GA",
        zip: "30034",
        creditCardNumber: "1234567890123456",
        creditCardExp: "03/19",
        creditValidationNumber: "567",
        phone: "4041234567",
        orders: [{ orderId: 2, price: 700 }],
      },
      {
        userId: 2,
        firstName: "Tifa",
        lastName: "Lockhart",
        street: "13 Bahamut Row",
        city: "Atlanta",
        state: "GA",
        zip: "30053",
        creditCardNumber: "1234567890123457",
        creditCardExp: "03/20",
        creditValidationNumber: "568",
        phone: "4041234568",
        orders: [{ orderId: 1, price: 400 }],
      }
    );
    console.log("Checkout Created: ");
    console.log("Finished creating checkout.");
    // create useful starting data
  } catch (error) {
    console.log("error creating DB");
    throw error;
  }
}

async function buildTables() {
  try {
    client.connect();

    await dropTables();
    await createTables();
  } catch (error) {
    throw error;
  }
}
buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
