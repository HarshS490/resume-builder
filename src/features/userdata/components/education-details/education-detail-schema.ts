import { z } from "zod";

export const EducationDetailSchema = z.object({
  qualification: z.string().min(1, "Qualification is needed"),
  startDate: z.date(),
  endDate: z.union([z.date(), z.literal("current")]),
  institution: z.string().min(1, "Institution name is needed"),
  score: z.coerce.number().min(0, "Score cannot be negative"),
});

export type EducationDetails = z.infer<typeof EducationDetailSchema>;
