const express = require("express");
const ordersRouter = express.Router();
const { requireUser } = require("./middleware");
const {
  createOrder,
  getOrdersByUser,
  getCartByUser,
  updateOrderQuantity,
  destroyCart,
  deleteOrder,
} = require("../db");

ordersRouter.get("/:userId", requireUser, async (req, res, next) => {
  try {
    const orders = await getOrdersByUser(user.id);
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/cart/:userId", requireUser, async (req, res, next) => {
  try {
    const orders = await getCartByUser(req.params.userId);

    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/", async (req, res, next) => {
  try {
    const order = await createOrder(req.body);

    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.get("/users/:userId/orders", async (req, res, next) => {
  try {
    const orders = await getOrdersByUser();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  try {
    const order = await updateOrderQuantity({
      id: req.params.orderId,
      quantity: req.body.quantity,
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/cart/:userId", requireUser, async (req, res, next) => {
  try {
    const cart = await destroyCart(req.params.userId);
    res.send(cart);
  } catch (error) {
    next(error);
  }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const order = await deleteOrder(req.params.orderId);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
