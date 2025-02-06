"use client"
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { WorkExperienceInput } from "./work-experience-input";
import { EducationDetailsInput } from "./education-details-input";
import { JobDescriptionInput } from "./job-description-input";
import { ProjectsInput } from "./project-input/projects-input";
import { EducationDetailsTable } from "./education-details/education-details-table";
import { z } from "zod";
import { resumeSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const ResumeForm = () => {
  const onSubmit = () => {};
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EducationDetailsInput form={form} />
        <WorkExperienceInput form={form} />
        <JobDescriptionInput form={form} />
        <ProjectsInput form={form} />
        <EducationDetailsTable />
      </form>
    </Form>
  );
};

export { ResumeForm };
