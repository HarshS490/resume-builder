"use client";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { AchievementsInput } from "./achievements-input/achievements-input";
import { BasicUserDetail } from "./basic-user-detail/basic-user-detail";
import { EducationDetailInput } from "./education-details/education-detail-input";
import { JobDescriptionInput } from "./job-description-input";
import { ProjectsInput } from "./project-input/projects-input";
import { WorkExperienceInput } from "./work-experience/work-experience-input";
import { Button } from "@/components/ui/button";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { resumeSchemaType } from "../schemas";
import { SubmitSection } from "./submit-section/submit-section";
import { ConnectionsSection } from "./work-experience/connections-section";

type StepId =
  | "usrDtls"
  | "projects"
  | "achievements"
  | "workExp"
  | "eduDtls"
  | "jobDesc";

interface stepConfig {
  id: StepId;
  label: string;
  Form: React.FC<{ form: UseFormReturn<resumeSchemaType> }>;
  prev?: StepId;
  next?: StepId;
}

const FORM_STEPS: stepConfig[] = [
  {
    id: "usrDtls",
    label: "User Details",
    Form: BasicUserDetail,
    next: "projects",
  },
  {
    id: "projects",
    label: "Projects",
    Form: ProjectsInput,
    prev: "usrDtls",
    next: "achievements",
  },
  {
    id: "achievements",
    label: "Achievements",
    Form: AchievementsInput,
    prev: "projects",
    next: "workExp",
  },
  {
    id: "workExp",
    label: "Work Experience",
    Form: WorkExperienceInput,
    prev: "achievements",
    next: "eduDtls",
  },
  {
    id: "eduDtls",
    label: "Education Details",
    Form: EducationDetailInput,
    prev: "workExp",
    next: "jobDesc",
  },
  {
    id: "jobDesc",
    label: "Job Description",
    Form: JobDescriptionInput,
    prev: "eduDtls",
  },
];

function Navigation({ step }: { step: stepConfig }) {
  const router = useRouter();

  return (
    <div className="w-full flex flex-nowrap justify-between items-center">
      <Button
        onClick={() => router.push(`/dummy/${step.prev}`)}
        disabled={!step.prev}
      >
        Prev
      </Button>
      <Button
        onClick={() => router.push(`/dummy/${step.next}`)}
        disabled={!step.next}
      >
        Next
      </Button>
    </div>
  );
}

type MultiStepFormProps = {
  step: string;
};

export function MultiStepForm({ step }: MultiStepFormProps) {
  const form = useFormContext<resumeSchemaType>();
  const router = useRouter();
  const currentStepInd = FORM_STEPS.findIndex((s) => s.id === step);
  const currentStep = FORM_STEPS[currentStepInd];
  const handleSubmit = (data: resumeSchemaType) => {
    console.log(data);
  };
  if (!currentStep) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-bold mb-4">Invalid Step</h2>
        <Button onClick={() => router.push("/dummy/usrDtls")}>
          Return to Start
        </Button>
      </div>
    );
  }
  const StepForm = currentStep.Form;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
        <StepForm form={form}></StepForm>
        {(currentStep.id==='usrDtls')?<ConnectionsSection/>:<span></span>}
        <Navigation step={currentStep} />
        {(currentStep.id==='jobDesc')?<SubmitSection/>:<span></span>}
      </form>
    </Form>
  );
}
