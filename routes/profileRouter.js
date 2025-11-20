const express = require("express");
const profileController = require("../controller/profileController");

const profileRouter = express.Router();

profileRouter.post("/reply", profileController.postReply);
profileRouter.get("/:UsersProfile", profileController.getProfile);
profileRouter.post("/:UsersProfile", profileController.postQuestion); // might change this

module.exports = { profileRouter };
