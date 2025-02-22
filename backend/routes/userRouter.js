const express = require("express");

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup", authController.signup);
userRouter.post("/login", authController.login);
userRouter.get("/logout", authController.logout); // da bismo izbrisali cookie na frontendu
userRouter.post("/forgot-password", authController.forgotPassword);
userRouter.patch("/reset-password/:token", authController.resetPassword);

userRouter
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin", "user"),
    userController.getAllUsers
  );
// .post(userController.createUser);

userRouter
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
