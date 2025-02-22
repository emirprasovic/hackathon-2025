const express = require("express");
const donationController = require("../controllers/donationController");

const donationRouter = express.Router();

donationRouter
  .route("/")
  .get(donationController.getAllDonations)
  .post(donationController.createDonation);

donationRouter.route("/:id").get(donationController.getDonation);

module.exports = donationRouter;
