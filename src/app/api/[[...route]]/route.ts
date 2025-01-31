import { Hono } from "hono";
import { handle } from "hono/vercel";
const app = new Hono().basePath("/api");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.get("/hello", (c) => {
  return c.json({ hello: "hello" });
});
export const POST = handle(app);
export const GET = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
