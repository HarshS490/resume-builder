import { auth } from "@/lib/auth/auth";
import { type Context, Hono, type Next } from "hono";
import { createMiddleware } from "hono/factory";
import type { Session } from "next-auth";

type MiddlewareType = {
  Variables: {
    session: Session;
  };
};

export const authMiddleware = createMiddleware<MiddlewareType>(
  async (c: Context, next: Next) => {
    const session = await auth();
    if (!session) {
      return c.text("Unauthorized", 401);
    }
    c.set("session", session);
    await next();
  }
);

const app = new Hono().get("/", async (c) => {
  return c.json({ message: "Auth route work working" });
});

export default app;
