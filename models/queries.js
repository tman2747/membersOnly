const pool = require("./pool");
const bcrypt = require("bcryptjs");

exports.signUp = async (username, password, email, firstName, lastName) => {
  const hashedPassword = await bcrypt.hash(password, 15);
  await pool.query(
    "INSERT INTO users (username,password,email,first_name,last_name) values($1,$2,$3,$4,$5)",
    [username, hashedPassword, email || null, firstName, lastName || null]
  );
};

// exports.getAllUsers = async () => {
//   const { rows } = await pool.query("select * from users");
//   return rows;
// };

// exports.addUser = async (name, date) => {
//   await pool.query("INSERT INTO users (username,post) VALUES($1,$2)", [
//     name,
//     date,
//   ]);
// };
