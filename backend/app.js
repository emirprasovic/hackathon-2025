const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRouter");
const donationRouter = require("./routes/donationRouter");
const paymentRouter = require("./routes/paymentRouter");

const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Mounting Routers
app.use("/api/v1/user", userRouter);
app.use("/api/v1/donation", donationRouter);
app.use("/api/v1/payment", paymentRouter);

// 404 Handler
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
