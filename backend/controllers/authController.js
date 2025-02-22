const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const crypto = require("crypto"); // built in node module

const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });
};

const signAndReturnToken = (user, res, statusCode) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRATION_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "lax",
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // We don't want to return the hashed password to the user after he logs in
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  if (!req.body.passwordConfirm)
    return next(new AppError("Please specify the passwordConfirm field", 400));

  if (req.body.password != req.body.passwordConfirm)
    return next(new AppError("Please confirm your password correctly", 400));

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  signAndReturnToken(newUser, res, 201);
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError("Please provide the email and password", 400));

  // Selecting the password because we put select: false in the model for the password
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );

  // If there is no user -> invalid email; If the passwords don't match -> invalid password
  if (!user || !(await user.verifyPassword(req.body.password, user.password))) {
    return next(new AppError("Invalid email or password"));
  }

  signAndReturnToken(user, res, 200);
});

exports.protect = catchAsync(async (req, res, next) => {
  //   console.log(req.headers.authorization);
  // Step 1: Grab the token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("You are not logged in", 401));
  }

  // Step 2: Decode and verify the token

  //   const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  //       if (err) return next(err);
  //       else {}
  //     }
  //   );
  // We will promisify the .verify function so it returns a promise which we can await, making the syntax look cleaner

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //   console.log(decoded);

  // Step 3: Check if user belonging to the token still exists
  const user = await User.findById(decoded.id);
  if (!user) return next(new AppError("This user doesn't exist anymore", 401));

  // Step 4: Check if user changed password after the token has been issued
  if (user.changedPasswordAfterTokenIssue(decoded.iat))
    return next(
      new AppError(
        "You recently changed your password. Please log in again",
        401
      )
    );

  // Each middleware after this one will have access to the currently logged in user
  req.user = user;
  next();
});

// The inner returned function will have access to "roles" due to closures
// Each time we want to pass arguments to middleware functions, we can use this approach
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );

    next();
  };
};

exports.logout = (req, res, next) => {
  //   if (req.headers.authorization) req.headers.authorization = undefined;
  if (req.cookies.jwt) res.clearCookie("jwt");

  res.status(200).json({
    status: "success",
    message: "logged out successfully",
    warning:
      "this only clears the jwt cookie. Does not clear the authorization header",
  });
};

exports.changePassword = catchAsync(async (req, res, next) => {
  const { passwordCurrent, newPassword, passwordConfirm } = req.body;
  if (!passwordConfirm || !passwordCurrent || !newPassword)
    return next(
      new AppError(
        "Please specify all fields: passwordCurrent, newPassword, passwordConfirm",
        400
      )
    );

  const user = await User.findById(req.user.id).select("+password");

  if (newPassword != passwordConfirm)
    return next(new AppError("Please repeat your password correctly", 400));

  if (!(await user.verifyPassword(passwordCurrent, user.password)))
    return next(new AppError("Incorrect password", 401));

  user.password = newPassword;
  await user.save();

  signAndReturnToken(user, res, 200);
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new AppError("Please specify the email", 400));

  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("There is no user with that email", 400));

  const resetTokenString = crypto.randomBytes(32).toString("hex");
  const resetToken = crypto
    .createHash("sha256")
    .update(resetTokenString)
    .digest("hex");

  user.passwordResetToken = resetToken;
  user.passwordResetTokenExpires = Date.now() + 1000 * 60 * 10; // Expires in 10 minutes

  await user.save({ validateBeforeSave: false });

  // Temprorary, usually send the token to the user's email
  res.status(200).json({ resetTokenString });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  console.log(hashedToken);
  const user = await User.findOne({ passwordResetToken: hashedToken });

  if (!user) return next(new AppError("Token is invalid", 400));

  if (user.passwordResetTokenExpires < Date.now())
    return next(new AppError("Token is expired", 400));

  if (!req.body.password || !req.body.passwordConfirm)
    return next(
      new AppError("Please specify both the password and passwordConfirm", 400)
    );

  if (req.body.password != req.body.passwordConfirm)
    return next(new AppError("Please repeat your password correctly", 400));

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;

  await user.save();

  //   signAndReturnToken(user, res, 200);
  res.status(200).json({
    status: "success",
    message: "password changed successfully",
  });
});
