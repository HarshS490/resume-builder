import { Hono } from "hono";

const app = new Hono()
  .get('/', async (c) => {
    return c.json({message : "Auth route work working"})
  })

export default app