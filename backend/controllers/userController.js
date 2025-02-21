const User = require("../models/userModel");
const factory = require("./controllerFactory");

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.createUser = async (req, res, next) => {
  if (!req.body.name || !req.body.email) {
    return res.status(401).json({ message: "invalid" });
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      data: newUser,
    },
  });
};
