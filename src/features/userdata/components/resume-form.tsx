"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { JobDescriptionInput } from "./job-description-input";
import { ProjectsInput } from "./project-input/projects-input";

import { z } from "zod";
import { resumeSchema, resumeSchemaType } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AchievementsInput } from "./achievements-input/achievements-input";
import { WorkExperienceInput } from "./work-experience/work-experience-input";
import { EducationDetailInput } from "./education-details/education-detail-input";
import { BasicUserDetail } from "./basic-user-detail/basic-user-detail";
import { ConnectionsSection } from "./work-experience/connections-section";
import { SubmitSection } from "./submit-section/submit-section";

type ResumeFormProps = {
  onSubmit?: (values: resumeSchemaType) => void;
};
const ResumeForm = ({ onSubmit }: ResumeFormProps) => {
  const handleSubmit = (values: resumeSchemaType) => {
    onSubmit?.(values);
    console.log(values)
  };
  const form = useForm<z.infer<typeof resumeSchema>>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      achievements: [],
      education_details: [],
      extraactivity: [],
      job_description: "",
      name: {
        contact: "",
        email: "",
        firstName: "",
        lastName: "",
        middleName: "",
      },
      projects: [],
      work_experience: [],
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <BasicUserDetail form={form} />
        <ConnectionsSection />
        <ProjectsInput form={form} />
        <AchievementsInput form={form} />
        <WorkExperienceInput form={form} />
        <EducationDetailInput form={form} />
        <JobDescriptionInput form={form} />
        <SubmitSection />
      </form>
    </Form>
  );
};

export { ResumeForm };
