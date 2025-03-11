import { REDIS_TOKEN, REDIS_URL } from "@/config";
import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: REDIS_URL,
  token: REDIS_TOKEN,
});
