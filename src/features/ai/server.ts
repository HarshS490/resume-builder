import { Hono } from "hono";
import { smoothStream, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { GEMINI_API_KEY } from "@/config";
import { stream } from "hono/streaming";

const app = new Hono().post(
  "/chat",
  // zValidator("json", coreMessageSchema),
  async (c) => {
    const messages = await c.req.json();
    const gemini = createGoogleGenerativeAI({
      apiKey: GEMINI_API_KEY,
    });
    console.log(messages);
    const result = streamText({
      model: gemini("gemini-2.0-flash"),
      system: "You are a helpful assistant who will chat with the user",
      experimental_transform: smoothStream({
        delayInMs: 50,
        chunking: "word",
      }),
      messages: messages.messages,
    });
    c.header("X-Vercel-AI-Data-Stream", "v1");
    c.header("Content-Type", "text/plain; charset=utf-8");
    return stream(c, (stream) => stream.pipe(result.toDataStream()));
  }
).get("/options", async(c) => {
  
})




export default app;
