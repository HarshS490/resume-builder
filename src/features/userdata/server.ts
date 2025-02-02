import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import {
  PropmptFn,
} from "./helpers";
import {
  GITHUB_CLID,
  GITHUB_CLID_SECRET,
  REDIS_TOKEN,
  REDIS_URL,
} from "@/config";
import axios from "axios";
import { Redis } from "@upstash/redis";
import { authMiddleware } from "../auth/server";

const app = new Hono()
  .get(
    "/repos",
    authMiddleware,
    zValidator(
      "query",
      z.object({
        github_user_id: z.string(),
      })
    ),
    async (c) => {
      const user_id = c.get('session').user?.id as string
      const { github_user_id } = c.req.valid("query");
      try {
        const redis = new Redis({
          url: REDIS_URL,
          token: REDIS_TOKEN,
        });
        const access_token = (await redis.get(user_id)) as string;
        if (access_token) {
          const url = `https://api.github.com/user/repos`;
          const res = await axios.get(url, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          });
          if (res.status !== 200) {
            throw new Error("Unable to get Repositories");
          }
          return c.json({private: true, data : res.data});
        } else {
          const url = `https://api.github.com/users/${github_user_id}/repos`;
          const res = await axios.get(url, {headers: {"Accept" : "application/json"}})
          if (res.status !== 200) {
            throw new Error("Unable to fetch from public api")
          }
          return c.json({private:false, data : res.data})
        }
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
    authMiddleware,
    zValidator("query", z.object({ code: z.string()})),
    async (c) => {
      const user_id = c.get('session').user?.id as string
      const { code } = c.req.valid("query");
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
        return c.json({ error: "Failed to genereate user token" }, 401);
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
    "/prompt", 
    // authMiddleware,
    zValidator("json", z.array(z.object({text : z.string()}))),
    async(c) => {
      const data = c.req.valid('json')
      const type = c.req.query('type')
      console.log(type)
      if (type === "projects") {
        const prompt = "Above are my project generate me a resume bullet point for each one of them in 50 words with metrics on a separate line. Fake metrics if not found. Don't add extra text decorations"
        const res = await PropmptFn({ prompt_data : data, prompt_text: prompt });
        const text = res.candidates[0].content.parts[0].text.split("\n").filter(item => item.length !== 0)
        return c.json(text)
      } else {
        return c.json({error : "Invalid Type"}, 401)
      }
    }
  )

export default app;
