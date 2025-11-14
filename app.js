const express = require("express");
const path = require("node:path");
const passport = require("passport");

require("./config/passport"); // initializes strategy + serialize/deserialize

// include routers
const { indexRouter } = require("./routes/indexRouter");
const { authRouter } = require("./routes/authRouter");

const app = express();
// set view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// add passport and session
// if using passport make sure the database matches config/passport.js and other querys
const session = require("express-session");
const pool = require("./models/pool");
app.use(
  session({
    store: new (require("connect-pg-simple")(session))({
      // look at connect-pg-simple docs get default schema
      pool: pool,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days in ms
      sameSite: "lax",
      path: "/",
    },
    rolling: true, // keeps resetting cookie to max age every request
  })
);

// add ref to public path for ejs?
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
const PORT = process.env.PORT || 3000;

// use nested parsing almost always should be true
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(passport.initialize()); // no longer required
app.use(passport.session()); // attach passport to session
// In express, you can set and access various local variables throughout your entire

// app (even in views) with the locals object. We can use this knowledge to write
// ourselves a custom middleware that will simplify how we access our current user in our views.
// Middleware functions are functions that take the req and res objects, manipulate them, and pass them on through the rest of the app.
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// routes
app.use("/", authRouter);
app.use("/", indexRouter);

// error handling
app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(500)
    .send("Uncaught error. Contact TristonSquad for support. " + `(${err})`);
});

// server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  // TODO: change this to get the domain and port automatically
  console.log(`app running on http://localhost:${PORT}`);
});
