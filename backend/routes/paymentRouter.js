const express = require("express");
const paymentController = require("../controllers/paymentController");
const authController = require("../controllers/authController");

const paymentRouter = express.Router();

paymentRouter
  .route("/checkout-session")
  .get(authController.protect, paymentController.getCheckoutSession);

module.exports = paymentRouter;
