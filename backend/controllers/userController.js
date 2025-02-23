const User = require("../models/userModel");
const factory = require("./controllerFactory");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.updateMe = catchAsync(async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  // 1) Create Error if user POSTs password
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        "You can not update your password here! Please use /update-password",
        400
      )
    );

  // Filter out all field names that we do not want to update, for example, "role" field
  // const filteredBody = filterObject(req.body, "name", "email");

  // Adding the image name to the database
  // if (req.file) filteredBody.photo = req.file.filename;

  // 2) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { name: req.body.name, email: req.body.email },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

exports.getCurrentUser = catchAsync(async (req, res, next) => {
  const currentUser = await User.findById(req.user.id);

  res.status(200).json({
    status: "success",
    data: currentUser,
  });
});

// exports.createUser = catchAsync(async (req, res, next) => {
//   if (!req.body.name || !req.body.email) {
//     return next(new AppError("Invalid Request retardu"));
//   }

//   const newUser = await User.create(req.body);

//   res.status(201).json({
//     status: "success",
//     data: {
//       data: newUser,
//     },
//   });
// });
