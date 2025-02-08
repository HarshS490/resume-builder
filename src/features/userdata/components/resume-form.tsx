"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { JobDescriptionInput } from "./job-description-input";
import { ProjectsInput } from "./project-input/projects-input";

import { z } from "zod";
import { resumeSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AchievementsInput } from "./achievements-input/achievements-input";
import { WorkExperienceInput } from "./work-experience/work-experience-input";
import { EducationDetailInput } from "./education-details/education-detail-input";

const ResumeForm = () => {
  const onSubmit = () => {};
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AchievementsInput form={form} />
        <ProjectsInput form={form} />
        <JobDescriptionInput form={form} />
        <WorkExperienceInput form={form} />
        <EducationDetailInput form={form} />
      </form>
    </Form>
  );
};

export { ResumeForm };
