import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  getGithubTokenFromDB,
  getRepositories,
  repoPropmptFn,
} from "./helpers";
import {
  GITHUB_CLID,
  GITHUB_CLID_SECRET,
  REDIS_TOKEN,
  REDIS_URL,
} from "@/config";
import axios from "axios";
import { Redis } from "@upstash/redis";
import { repoBulletPromptSchema } from "../schema";

const app = new Hono()
  .get(
    "/repos",
    zValidator(
      "query",
      z.object({
        user_id: z.string(),
        github_user_id: z.string(),
      })
    ),
    async (c) => {
      const { user_id, github_user_id } = c.req.valid("query");
      try {
        const access_token = await getGithubTokenFromDB(user_id);
        const repository_data = await getRepositories(
          access_token,
          github_user_id
        );
        return c.json(repository_data);
      } catch (error) {
        return c.json(
          {
            message: "Failed to fetch repository",
            error_message: (error as Error).message,
          },
          500
        );
      }
    }
  )
  .post(
    "/register/github",
    zValidator("query", z.object({ code: z.string(), user_id: z.string() })),
    async (c) => {
      const { code, user_id } = c.req.valid("query");
      const req_url = `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLID}&client_secret=${GITHUB_CLID_SECRET}&code=${code}`;
      const data = (
        await axios.post(
          req_url,
          {},
          {
            headers: {
              Accept: "application/json",
            },
          }
        )
      ).data;

      if (!data.access_token) {
        console.debug(data);
        return c.json({ error: "Failed to genereate user token" });
      } else {
        const redis = new Redis({
          url: REDIS_URL,
          token: REDIS_TOKEN,
        });
        await redis.set(user_id, data.access_token);
        return c.json("User token registered");
      }
    }
  )
  .post(
    "/prompt/repo",
    zValidator("json", repoBulletPromptSchema),
    async (c) => {
      const repo_data = c.req.valid("json");
      const data = await repoPropmptFn({ repo_data });
      const text = data.candidates[0].content.parts[0].text.split("\n").filter(item=> item.length !== 0)
      return c.json(text);
    }
  );

export default app;
