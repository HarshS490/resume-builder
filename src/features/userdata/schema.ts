import { z } from "zod";

export const repoBulletPromptSchema = z.array(
  z.object({
    text: z.string(),
  })
);
