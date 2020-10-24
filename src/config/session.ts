import session from "express-session";
import connectRedis from "connect-redis";
import redisClient from "./redis";

// Configure Redis
const RedisStore = connectRedis(session);

export default session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: false,
  name: "sessionId",
  cookie: {
    secure: false, // Set to true if HTTPS is enable
    httpOnly: true,
    maxAge: 1000 * 3600 * 24, // session max age in milliseconds = 24h
  },
});
