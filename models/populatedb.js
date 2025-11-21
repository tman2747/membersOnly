// const { Client } = require("pg");

const SQL = `
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
  profile_id        INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title             VARCHAR(280),
  message           TEXT NOT NULL,
  time_stamp        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  parent_message_id INTEGER REFERENCES messages(id) ON DELETE CASCADE,
  anonymous         BOOLEAN NOT NULL DEFAULT true
);
-- session table
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
-- end session table
`;

const { Pool } = require("pg");
// 1) Make sure the database exists
async function ensureDatabase(dbName) {
  const adminPool = new Pool({
    host: process.env.HOST,
    user: process.env.USERNAME, // or "postgres" or process.env.PGUSER
    password: process.env.PASSWORD, // or process.env.PGPASSWORD
    database: "postgres", // connect to default admin DB
  });

  const exists = await adminPool.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName]
  );

  if (exists.rowCount === 0) {
    console.log("Creating database:", dbName);
    await adminPool.query(`CREATE DATABASE "${dbName}"`);
  } else {
    console.log(`Database ${dbName} already exists`);
  }

  await adminPool.end();
}

// 2) Seed the target DB
const pool = require("./pool");
async function seedDatabase(dbName) {
  console.log(`Running schema on database: ${dbName}`);
  await pool.query(SQL); // tables get created in membersonly

  await pool.end();
}

async function main() {
  const DB_NAME = "membersonly";

  console.log("seeding...");
  await ensureDatabase(DB_NAME);
  await seedDatabase(DB_NAME);
  console.log("DONE");
}

main().catch((err) => {
  console.error("Error in populatedb:", err);
  process.exit(1);
});
