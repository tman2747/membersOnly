BEGIN;
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

rollback;