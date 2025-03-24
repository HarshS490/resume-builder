"use client";

import { cn } from "@/lib/utils";
import { ResumeItem } from "./resume-item";

export const ResumeList = ({
  resumes,
  className,
}: {
  className?: string;
  resumes: {
    image?: string;
    title: string;
    description: string;
    date: Date;
  }[];
}) => {
  return (
    <div
      className={cn(
        "flex flex-wrap gap-4 justify-center sm:justify-start",
        className
      )}
    >
      {resumes.map((resume) => (
        <ResumeItem key={resume.title} resume={resume} />
      ))}
    </div>
  );
};
