import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { PropmptFn } from "./helpers";
import {
  APP_URL,
  GITHUB_CLID,
  GITHUB_CLID_SECRET,
  REDIS_TOKEN,
  REDIS_URL,
} from "@/config";
import axios from "axios";
import { Redis } from "@upstash/redis";
import { authMiddleware } from "../auth/server";
import { encodedUrlSchema } from "./schemas";

const app = new Hono()
  .get("/github/user/repositories", authMiddleware, async (c) => {
    const user_id = c.get("session").userId
    if (!user_id) {
      return c.json({ error: "Bad Request" }, 401);
    }
    const redis = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    const access_token = await redis.get(`github_access_token_${user_id}`);
    if (!access_token) {
      return c.json({ error: "Unregistered" }, 401);
    }

    const url = `https://api.github.com/user/repos`;
    const res = await axios.get(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (res.status !== 200) {
      return c.json({ error: "Unable to fetch repositories" }, 400);
    }
    return c.json(res.data);
  })
  .get("/github/user", authMiddleware, async (c) => {
    const user_id = c.get("session").userId
    if (!user_id) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    const redis = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    const access_token = await redis.get(`github_access_token_${user_id}`);
    if (!access_token) {
      return c.json({ error: "Unregistered" }, 404);
    }
    const res = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!(res.status >= 200 && res.status <= 299)) {
      return c.json({ error: "Token Expired" }, 401);
    }
    return c.json(await res.data);
  })
  .get(
    "/github/redirect",
    zValidator(
      "query",
      z.object({
        origin_uri: encodedUrlSchema,
      })
    ),
    async (c) => {
      const { origin_uri } = c.req.valid("query");
      const redirectPath = encodeURIComponent(
        `${APP_URL}/api/userdata/github/register?origin_uri=${origin_uri}`
      );
      // const redirectPath = encodeURIComponent(
      //   `${APP_URL}/new?origin_uri=${origin_uri}`
      // );
      const path = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLID}&redirect_uri=${redirectPath}`;
      return c.redirect(path, 302);
    }
  )
  .get(
    "/github/register",
    authMiddleware,
    zValidator("query", z.object({ code: z.string(), origin_uri: z.string() })),
    async (c) => {
      const user_id = c.get("session").userId as string;
      const { code, origin_uri } = c.req.valid("query");
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
        return c.json({ error: "Failed to generate user token" }, 401);
      } else {
        const redis = new Redis({
          url: REDIS_URL,
          token: REDIS_TOKEN,
        });
        await redis.set(`github_access_token_${user_id}`, data.access_token);
        const decoded_origin = decodeURIComponent(origin_uri);
        return c.redirect(decoded_origin);
      }
    }
  )
  .delete("/github/unregister", authMiddleware, async (c) => {
    const user_id = c.get("session").userId;
    if (!user_id) {
      return c.json({ error: "Bad request" }, 400);
    }
    const redis = new Redis({
      url: REDIS_URL,
      token: REDIS_TOKEN,
    });
    const access_token = await redis.get(`github_access_token_${user_id}`);
    if (!access_token) {
      return c.json({ error: "Unregistered" }, 404);
    }
    await redis.del(`github_access_token_${user_id}`);
    return c.json({ success: "User Unregistered" }, 200);
  })
  .get(
    "/github/user/repo/readme",
    authMiddleware,
    zValidator(
      "query",
      z.object({ owner: z.string().min(1), repo: z.string().min(1) })
    ),
    async (c) => {
      const user_id = c.get("session").userId;
      if (!user_id) {
        return c.json({ error: "Bad request" }, 400);
      }
      const redis = new Redis({
        url: REDIS_URL,
        token: REDIS_TOKEN,
      });
      const access_token = await redis.get(`github_access_token_${user_id}`);
      if (!access_token) {
        return c.json({ error: "Unregistered" }, 404);
      }

      const { owner, repo } = c.req.valid("query");
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/readme`,
          {
            headers: {
              Accept: "application/vnd.github.raw+json",
              Authorization: `Bearer ${access_token}`
            },
          }
        );
        return c.json(res.data);
      } catch {
        return c.text("", 200);
      }
    }
  )
  .post(
    "/prompt",
    // authMiddleware,
    zValidator("json", z.array(z.object({ text: z.string() }))),
    async (c) => {
      const data = c.req.valid("json");
      const type = c.req.query("type");
      if (type === "projects") {
        const prompt =
          "Above are my project generate me a resume bullet point for each one of them in 50 words with metrics on a separate line. Fake metrics if not found. Don't add extra text decorations";
        const res = await PropmptFn({ prompt_data: data, prompt_text: prompt });
        const text = res.candidates[0].content.parts[0].text
          .split("\n")
          .filter((item) => item.length !== 0);
        return c.json(text);
      } else {
        return c.json({ error: "Invalid Type" }, 401);
      }
    }
  );

export default app;
