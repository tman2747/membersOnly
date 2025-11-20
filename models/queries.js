const pool = require("./pool");
const bcrypt = require("bcryptjs");

exports.signUp = async (username, password, email, firstName, lastName) => {
  const hashedPassword = await bcrypt.hash(password, 15);
  await pool.query(
    "INSERT INTO users (username,password,email,first_name,last_name) values($1,$2,$3,$4,$5)",
    [username, hashedPassword, email || null, firstName, lastName || null]
  );
};

exports.getByUsername = async (username) => {
  const { rows } = await pool.query(
    "select id,username,email,first_name,last_name,member,admin from users where username=$1 ",
    [username]
  );
  return rows;
};
exports.getProfileMessagesByID = async (id) => {
  const { rows } = await pool.query(
    "SELECT messages.id as message_id, messages.author_id, users.username as author, messages.message, messages.profile_id,profile_user.username as profile_user,messages.time_stamp,messages.anonymous from messages join users on messages.author_id = users.id join users as profile_user on profile_user.id=messages.profile_id where messages.profile_id=$1;",
    [id]
  );
  return rows;
};
exports.addMessageToProfile = async (authorId, message, profile_id) => {
  await pool.query(
    "INSERT into messages (author_id,message,profile_id) values($1,$2,$3)",
    [authorId, message, profile_id]
  );
};
exports.replyToMessage = async (
  parentMessageId,
  profileId,
  authorId,
  message
) => {
  await pool.query(
    "insert into messages (parent_message_id, profile_id, author_id, message) values($1,$2,$3,$4)",
    [parentMessageId, profileId, authorId, message]
  );
};
// exports.addUser = async (name, date) => {
//   await pool.query("INSERT INTO users (username,post) VALUES($1,$2)", [
//     name,
//     date,
//   ]);
// };
