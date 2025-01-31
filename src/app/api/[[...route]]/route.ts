import { Hono } from "hono";
import { handle } from "hono/vercel";
import userdata from "@/features/userdata/server/route";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/hello", (c) => {
    return c.json({ hello: "hello" });
  })
  .route("/userdata", userdata);

  
export const POST = handle(app);
export const GET = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
