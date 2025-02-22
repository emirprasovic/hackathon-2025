const AppError = require("../utils/AppError");

const handleValidationError = (err) => {
  const fails = Object.values(err.errors).map((fail) => fail.message);
  return new AppError(`Validation Error. ${fails.join(", ")}`, 400);
};

const handleDuplicateFieldError = (err) => {
  const key = Object.keys(err.errorResponse.keyValue)[0];
  const val = err.errorResponse.keyValue[key];
  return new AppError(
    `Cannot have duplicate values for field ${key} (${val})`,
    400
  );
};

const handleCastError = (err) => {
  console.log(err);
  return new AppError(
    `Invalid parameter type for '${err.path}': ${err.value}`,
    400
  );
};

const handleExpiredJWT = (err) => {
  return new AppError(
    "This session has expired (JWT Expired). Please log in again.",
    401
  );
};

const handleInvalidJWT = (err) => {
  return new AppError("This token is invalid. Please log in again.", 401);
};

const developmentError = (err, req, res, next) => {
  res.status(err.statusCode).json({
    message: err.message,
    statusCode: err.statusCode,
    error: err,
    stack: err.stack,
  });
};

const productionError = (err, req, res, next) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Unhandled error. Something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  console.log("WORKS");
  if (process.env.NODE_ENV === "development")
    developmentError(err, req, res, next);
  else {
    // let error;
    // console.log(error);

    // Why do we have to create a shallow copy even though we are overwriting the error underneath? The answer is beacuse of nonOperational errors. For example, "Uncaught Exceptions". If we don't have a shallow copy, we would get a "Cannot read properties of undefined (reading isOperational)" in the productionError() function because error is undefined (if we only do let error). Thats why we must create a copy
    let error = {
      ...err,
      message: err.message,
      statusCode: err.statusCode,
      name: err.name,
    };

    // For our AppError's, the err.name = "Error"
    // console.log(err.name);

    if (err.name === "ValidationError") error = handleValidationError(err);
    else if (err.name === "MongoServerError" || err.code === 11000)
      error = handleDuplicateFieldError(err);
    else if (err.name === "CastError") error = handleCastError(err);
    else if (err.name === "TokenExpiredError") error = handleExpiredJWT(err);
    else if (err.name === "JsonWebTokenError") error = handleInvalidJWT(err);

    productionError(error, req, res, next);
  }
};
