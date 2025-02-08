import { z } from "zod";

export const encodedUrlSchema = z.string().refine(
  (value) => {
    try {
      return encodeURI(decodeURIComponent(value)) === value; // Ensures it's encoded
    } catch {
      return false; // Invalid URL encoding
    }
  },
  {
    message: "Invalid encoded URL",
  }
);

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

export type EducationDetails = z.infer<typeof EducationDetailSchema>;

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

export const achievementSchema = z.object({
  value: z
    .string()
    .min(20, { message: "Describe your achievement more" })
    .default(""),
});

export const extraActivitySchema = z.object({
  value: z.string().min(20, { message: "Describe extra activity a bit more" }),
});

export const basicUserDetailSchema = z.object({
  firstName: z.string().min(1).default(""),
  middleName: z.string().default(""),
  lastName: z.string().default(""),
  contact: z
    .string()
    .regex(
      /^\d{7,15}$/,
      "Invalid phone number. It should contain only digits and be 7 to 15 characters long."
    )
    .default(""),
  email: z.string().email().default(""),
});
export const resumeSchema = z.object({
  education_details: z.array(EducationDetailSchema),
  work_experience: z.array(WorkExperienceDetailSchema),
  projects: z.array(projectSchema),
  job_description: jobDescriptionSchema,
  achievements: z.array(achievementSchema),
  extraactivity: z.array(extraActivitySchema),
  name: basicUserDetailSchema,
});

export type resumeSchemaType = z.infer<typeof resumeSchema>;
