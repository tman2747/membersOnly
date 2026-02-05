const pool = require("../models/pool");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// passport automatically looks for fields called username/password
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username],
      );
      const user = rows[0];
      if (!user) {
        console.log("Incorrect Username:", username);
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("incorrect password for user:", username);
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  // you can grab anything you want from the user table here too. like auth
  try {
    const { rows } = await pool.query(
      "SELECT id, username,email,first_name,last_name,member,admin FROM users WHERE id = $1", // not using * here removes password from user
      [id],
    );
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});
