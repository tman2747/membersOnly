const express = require("express");
const authController = require("../controller/authController");
const { validateSignup } = require("../validators/authValidators");

const authRouter = express.Router();

authRouter.get("/sign-up", authController.getSignup);
authRouter.post("/sign-up", validateSignup, authController.postSignup);

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

authRouter.get("/logout", authController.getLogout);
module.exports = { authRouter };
