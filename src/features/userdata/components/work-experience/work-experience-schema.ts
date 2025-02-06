import { z } from "zod";

export const WorkAchievementsSchema = z
  .array(z.string().max(20, "Achievement can be at most 20 characters"))
  .max(4, "Maximum 4 achievements are allowed");

export const WorkExperienceDetailSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.date(),
  endDate: z.union([z.date(), z.literal("current")]),
  aboutRole: z
    .string()
    .max(500, "About role should be less than 500 characters"),
  achievements: WorkAchievementsSchema,
});

export type WorkExperience = z.infer<typeof WorkExperienceDetailSchema>;
export type WorkAchievements = z.infer<typeof WorkAchievementsSchema>;
