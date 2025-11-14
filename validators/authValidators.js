const { body, validationResult } = require("express-validator");

function passwordsMatch(value, { req }) {
  return value === req.body.password;
}

exports.validateSignup = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 36 })
    .withMessage(
      "Username must be at least 3 characters and less than 36 characters"
    )
    .isAlphanumeric()
    .withMessage("Username must be alphanumeric"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters"),
  body("passwordConfirm")
    .custom(passwordsMatch)
    .withMessage("passwords must match"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid Email address")
    .normalizeEmail(),
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ max: 36 })
    .withMessage("First name cannot be longer than 36 characters"),
  body("lastName")
    .isLength({ max: 36 })
    .withMessage("First name cannot be longer than 36 characters"),
  (req, res, next) => {
    const errors = validationResult(req); // this gets basically passed in by the authrouters validation middleware
    if (!errors.isEmpty()) {
      return res.render("signup", {
        errors: errors.array(),
      });
    }
    next();
  },
];
