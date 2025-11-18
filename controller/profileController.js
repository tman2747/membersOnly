const queries = require("../models/queries");

exports.getProfile = async (req, res, next) => {
  // query for the uses profile
  const username = req.path.slice(1); // striping the / from path
  const profile = await queries.getByUsername(username);
  if (profile.length >= 1) {
    console.log(profile);
    res.render("profile", { profile: profile[0] });
  } else {
    next();
  }
};

exports.postQuestion = async (req, res, next) => {
  console.log(req.path);
  res.redirect("/");
};
