const dotenv = require("dotenv");
const mongoose = require("mongoose");

process.on("unhandledRejection", (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log("Unhandled Rejection. Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`${err.name}: ${err.message}`);
  console.log("Uncaught Exception. Shutting down...");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

dotenv.config({
  path: "./config.env",
});

// This line has to be beneath the dotenv config, because we first want to load the environment variables before executing the app script
const app = require("./app");

const uri = process.env.DATABASE_CONNECTION.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD_ENCODED
);

// Connect to database
mongoose.connect(uri).then(() => {
  console.log("Connected to DB");
});

// Run the server to listen for requests
const server = app.listen(process.env.PORT, () => {
  console.log("App running on port", process.env.PORT);
});
