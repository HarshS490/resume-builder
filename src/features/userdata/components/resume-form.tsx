"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { JobDescriptionInput } from "./job-description-input";
import { ProjectsInput } from "./project-input/projects-input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { resumeSchema, resumeSchemaType } from "../schemas";
import { AchievementsInput } from "./achievements-input/achievements-input";
import { BasicUserDetail } from "./basic-user-detail/basic-user-detail";
import { EducationDetailInput } from "./education-details/education-detail-input";
import { SubmitSection } from "./submit-section/submit-section";
import { ConnectionsSection } from "./work-experience/connections-section";
import { WorkExperienceInput } from "./work-experience/work-experience-input";

type ResumeFormProps = {
  onSubmit?: (values: resumeSchemaType) => void;
};
const ResumeForm = ({ onSubmit }: ResumeFormProps) => {
  const handleSubmit = (values: resumeSchemaType) => {
    onSubmit?.(values);
    console.log(values);
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
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-6xl mx-auto"
      >
        <div className="md:flex md:items-center">
          <BasicUserDetail form={form} />
          <ConnectionsSection />
        </div>
        <ProjectsInput form={form} />
        <AchievementsInput form={form} />
        <div className="lg:flex">
          <WorkExperienceInput className="flex-1" form={form} />
          <EducationDetailInput className="flex-1" form={form} />
        </div>
        <JobDescriptionInput form={form} />
        <SubmitSection />
      </form>
    </Form>
  );
};

export { ResumeForm };
