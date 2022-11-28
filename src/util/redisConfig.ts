import Redis from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "redis",
  password: process.env.REDIS_PASSWORD,
  db: 0,
});

async function set(key: string, value: string) {
  return redis.set(key, value, "EX", 60 * 10);
}

async function get(key: string) {
  return redis.get(key, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      return result;
    }
  });
}

export { redis, set, get };
