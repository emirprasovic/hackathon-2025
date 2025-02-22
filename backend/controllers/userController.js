const User = require("../models/userModel");
const factory = require("./controllerFactory");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.createUser = catchAsync(async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return next(new AppError("Invalid Request retardu"));
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
});
