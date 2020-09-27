const session = require("express-session");
const connectRedis = require("connect-redis");
const redisClient = require("./redis");

// Configure Redis
const RedisStore = connectRedis(session);

module.exports = session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  name: "sessionId",
  cookie: {
    secure: false, // Set to true if HTTPS is enable
    httpOnly: true,
    maxAge: 1000 * 3600 * 24, // session max age in milliseconds = 24h
  },
});
