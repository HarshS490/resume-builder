import { z } from "zod";

export const repoBulletPromptSchema = z.array(
  z.object({
    text: z.string(),
  })
);

export const jobDescriptionSchema = z.string().default("");
export const projectTagSchema = z.object({ value: z.string().min(3).max(50) });
export const projectLinksSchema = z.object({
  value: z.string().regex(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*\/?$/, {
    message: "Invalid URL format",
  }),
});
export const projectSchema = z.object({
  project_title: z
    .string()
    .min(5, { message: "Please enter a valid project name" })
    .default(""),
  project_description: z.string().default(""),
  project_tags: z.array(projectTagSchema).default([]),
  project_links: z.array(projectLinksSchema).min(0).default([]),
});

export const EducationDetailSchema = z.object({
  qualification: z.string().min(1, "Qualification is needed"),
  startDate: z.date(),
  endDate: z.union([z.date(), z.literal("current")]),
  institution: z.string().min(1, "Institution name is needed"),
  score: z.coerce.number().min(0, "Score cannot be negative"),
});

export const achievementSchema = z.object({
  value: z.string().min(20, {message: "Describe your achievement more"}).default(""),
});

export const resumeSchema = z.object({
  education_details: z.array(EducationDetailSchema),
  projects: z.array(projectSchema),
  job_description: jobDescriptionSchema,
  achievements: z.array(achievementSchema),
});

export type resumeSchemaType = z.infer<typeof resumeSchema>;
