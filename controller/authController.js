const passport = require("passport");
const querys = require("../models/queries");

exports.getSignup = (req, res, next) => {
  res.render("signup");
};
exports.postSignup = async (req, res, next) => {
  try {
    await querys.signUp(
      req.body.username,
      req.body.password,
      req.body.email,
      req.body.firstName,
      req.body.lastName
    );
    res.redirect("/login");
  } catch (error) {
    console.log("error during signup");
    next(error);
  }
};

exports.getLogin = (req, res, next) => {
  res.render("login");
};
// i can add the express validator to this if I want but its not really needed unless I want to add messages i guess
exports.postLogin = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    // THIS CALLBACK is where `done` returns to from passport.js config
    if (error) {
      return next(error);
    }

    //failed login
    if (!user) {
      res.render("login", { error: info.message });
      return;
    }

    //sucssesful Login
    req.logIn(user, (error) => {
      if (error) {
        return next(error);
      }
      res.redirect("/");
    });
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
