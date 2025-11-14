const passport = require("passport");
const querys = require("../models/queries");
const { validationResult } = require("express-validator");

exports.getSignup = (req, res, next) => {
  res.render("signup");
};
exports.postSignup = async (req, res, next) => {
  // this gets basically passed in by the authrouters validation middleware
  // should probably change this to its own handlesignupvalidation and
  // then just pass it to next middleware
  // below
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("signup", {
      errors: errors.array(),
    });
  }
  // above ^^^^^^^^^^^^^^^^
  try {
    await querys.signUp(req.body.username, req.body.password);
    res.redirect("/login");
  } catch (error) {
    console.log("error in signup");
    next(error);
  }
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};
// i can add the express validator to this if I want but its not really needed unless I want to add messages i guess
exports.postLogin = (req, res, next) => {
  return passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })(req, res, next);
};

exports.getLogout = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect("/");
  });
};
