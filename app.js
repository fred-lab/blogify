require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const redis = require("redis");
const connectRedis = require("connect-redis");

const router = require("./routes/index");

const app = express();

// if you run behind a proxy (e.g. nginx)
// app.set("trust proxy", 1);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Configure Redis
const RedisStore = connectRedis(session);
const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: "redis",
});

//Configure the Session middleware
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if HTTPS is enable
      httpOnly: true,
      maxAge: 1000 * 3600 * 5, // session max age in milliseconds = 5h
    },
  })
);

app.use("/", router);

module.exports = app;
