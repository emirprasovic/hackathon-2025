const Donation = require("../models/donationModel");
const factory = require("./controllerFactory");

exports.getAllDonations = factory.getAll(Donation);
exports.getDonation = factory.getOne(Donation);
exports.createDonation = factory.createOne(Donation);
