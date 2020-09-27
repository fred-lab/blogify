require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("./config/session");
const router = require("./routes/index");
const { init } = require("./config/postgres");

const app = express();

// if you run behind a proxy (e.g. nginx)
// app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Configure the Session middleware
app.use(session);

app.use("/", router);

// Connect to Postgres
init();

module.exports = app;
