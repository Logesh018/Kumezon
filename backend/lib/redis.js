import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

// Redis is a key-value store that is often used for caching and session storage.
export const redis = new Redis(process.env.REDIS_URL);
