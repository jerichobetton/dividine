const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0";

const multer = require("multer");

const passport = require("passport");
const session = require("express-session");
const sequelizeStore = require("connect-session-sequelize")(session.Store);

const path = require("path");
const layouts = require("express-ejs-layouts");

//const { Sequelize } = require("./app/models");
const cookieParser = require("cookie-parser");

const db = require("./db/helpers/init");

// Session Store
const sessionStore = new sequelizeStore({
  db: db,
});

// Parse form submissions, cookies
app.use(express.json());
app.use(multer().none());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Templates
app.use(layouts);
app.set("views", path.join(__dirname, "app/views"));
app.set("layout", "layouts/application");
app.set("view engine", "ejs");

// Static files
app.use(express.static(__dirname + "/public"));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
  })
);

sessionStore.sync();
app.use(passport.authenticate("session"));

// Routes
app.use("/", require("./config/routes"));

app.listen(port, host, () => {
  console.log(`Example app listening on http://${host}:${port}`);
});
