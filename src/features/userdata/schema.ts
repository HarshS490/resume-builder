import { z } from "zod";

export const repoBulletPromptSchema = z.array(
  z.object({
    title: z.string(),
    readme: z.string().optional().default("")
  })
);
