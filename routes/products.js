const express = require("express");
const productsRouter = express.Router();
const { requireUser } = require("./middleware");
const { getProductsById, getAllProducts, createProduct } = require("../db");

productsRouter.post('/', async (req, res, next) => {
  try{
    const product = await createProduct(req.body);
    res.send(product);
  }catch(error){
    next(error)
  }
})

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const product = await getProductsById(req.params.productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/admin", requireUser, async (req, res, next) => {
  try {
    const products = await updateProducts(req.body);
    res.send(products);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
