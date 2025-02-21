const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

// Mounting Routers
// app.use("/api/v1/movies", movieRouter);
app.use("/api/v1/user", userRouter);

// Global Error Handler
// app.use(errorController);

module.exports = app;
