const express = require("express");
const checkoutRouter = express.Router();
const { getAllCheckoutsByUserId, createCheckout } = require("../db");
const { requireUser } = require("./middleware");

checkoutRouter.get("/:userId", requireUser, async (req, res, next) => {
  try {
    const checkout = await getAllCheckoutsByUserId(req.params.userId);
    res.send(checkout);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

checkoutRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const checkout = await createCheckout(req.body);
    res.send(checkout);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

checkoutRouter.post("/guest", async (req, res, next) => {
  try {
    const checkout = await createCheckout({ userId: undefined, ...req.body });
    res.send(checkout);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = checkoutRouter;
