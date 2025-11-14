const { body } = require("express-validator");

exports.validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
];
