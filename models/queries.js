const pool = require("./pool");
const bcrypt = require("bcryptjs");

exports.signUp = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 15);
  await pool.query(
    "insert into users (username,password,admin) values($1,$2,false)",
    [username, hashedPassword]
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
