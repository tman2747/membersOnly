const { use } = require("passport");
const queries = require("../models/queries");

exports.getProfile = async (req, res, next) => {
  // query for the uses profile
  const username = req.path.slice(1); // striping the / from path
  const profile = await queries.getByUsername(username);
  if (profile.length >= 1) {
    const messages = await queries.getProfileMessagesByID(profile[0].id);
    res.render("profile", { profile: profile[0], messages: messages });
  } else {
    next();
  }
};

exports.postQuestion = async (req, res, next) => {
  const message = req.body.message;
  const authorId = req.body.profileId;
  console.log(req.path);
  if (req.user) {
    const posterID = req.user.id;
    queries.addMessageToProfile(posterID, req.body.message, req.body.profileId);
  }
  res.redirect(`/profile${req.path}`);
};

exports.postReply = async (req, res, next) => {
  const parentMessageId = req.body.parentMessageId;
  const profileId = req.body.profileID;
  const message = req.body.message;
  const userId = req.user.id;
  const prevPage = req.body.profileUsername;
  await queries.replyToMessage(parentMessageId, profileId, userId, message);
  res.redirect(`/profile/${prevPage}`);
};
