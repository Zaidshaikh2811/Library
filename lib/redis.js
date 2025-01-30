import Redis from "ioredis";

const redis = new Redis({
    host: "localhost", // If running inside Docker, use "redis-container" instead
    port: 6379,
});

export default redis;
