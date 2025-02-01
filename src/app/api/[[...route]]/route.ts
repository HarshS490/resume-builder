import userdata from "@/features/userdata/server/route";
import { auth } from "@/lib/auth/auth";
import { type Context, Hono, type Next } from "hono";
import { createMiddleware } from "hono/factory";
import { handle } from "hono/vercel";
import type { Session } from "next-auth";
const app = new Hono().basePath("/api");

const authMiddleware = createMiddleware<{
  Variables: {
    session: Session;
  };
}>(async (c: Context, next: Next) => {
  const session = await auth();
  if (!session) {
    return c.text("Unauthorized", 401);
  }
  c.set("session", session);
  await next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .get("/hello", (c) => {
    return c.json({ hello: "hello" });
  })
  .get("/protected", authMiddleware, async (c) => {
    const user = c.get("session");
    return c.json({ message: "protected", user });
  })
  .route("/userdata", userdata);

export const POST = handle(app);
export const GET = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
