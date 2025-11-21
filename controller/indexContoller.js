const queries = require("../models/queries");
exports.getIndex = async (req, res, next) => {
  // console.log(req.user); // if passport authed the user this will be attached to req
  // console.log(req.isAuthenticated());
  const users = await queries.getUsers();
  res.render("index", { stuff: "you can send stuff to ejs here", users });
};

exports.getProtectedRoute = (req, res, next) => {
  res.render("protectedPage");
};
