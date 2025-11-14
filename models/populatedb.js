// const { Client } = require("pg");

const SQL = `BEGIN;

CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  username    VARCHAR(36) UNIQUE NOT NULL,
  password    VARCHAR(120) NOT NULL,
  email       VARCHAR(320) UNIQUE,
  first_name  VARCHAR(36) NOT NULL,
  last_name   VARCHAR(36),
  member      BOOLEAN NOT NULL DEFAULT false,
  admin       BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS messages (
  id                SERIAL PRIMARY KEY,
  author_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  profile_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title             VARCHAR(280),
  message           TEXT NOT NULL,
  time_stamp        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  parent_message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
  anonymous         BOOLEAN NOT NULL DEFAULT true
);

INSERT into users (username,password,email,first_name,member,admin) values('tman2747','','triston@gmail.com','triston',true,true);
SELECT* from users;
rollback;
`;

// async function main() {
//   console.log(process.env.HOST);

//   console.log("seeding...");
//   const client = new Client({
//     connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:5432/${process.env.DATABASE}`,
//   });
//   const count = await client.query("SELECT COUNT(*) FROM users");
//   if (count.rows[0].count === "0") {
//     await client.query(
//       "INSERT INTO users (username, post) VALUES ('Triston', 'Hello World!')"
//     );
//   }
//   await client.connect();
//   await client.query(SQL);
//   await client.end();
//   console.log("DONE");
// }
// main();
