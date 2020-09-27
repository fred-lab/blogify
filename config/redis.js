const redis = require("redis");

const redisClient = redis.createClient({
  port: process.env.REDIS_PORT,
  host: "redis",
});

module.exports = redisClient;
