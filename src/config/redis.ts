import redis from "redis";

export default redis.createClient({
  port: parseInt(process.env.REDIS_PORT!, 10),
  host: "redis",
});
