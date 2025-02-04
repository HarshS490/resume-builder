"use client"
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { WorkExperienceInput } from "./work-experience-input";
import { EducationDetailsInput } from "./education-details-input";
import { JobDescriptionInput } from "./job-description-input";
import { ProjectsInput } from "./projects-input";

const ResumeForm = () => {
  const onSubmit = () => {};
  const form = useForm({});
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <EducationDetailsInput form={form} />
        <WorkExperienceInput form={form} />
        <JobDescriptionInput form={form} />
        <ProjectsInput form={form} />
      </form>
    </Form>
  );
};

export { ResumeForm };
