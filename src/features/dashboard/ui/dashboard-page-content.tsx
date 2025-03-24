"use client";

import { DashboardHeader } from "./dashboard-header";
import { ResumeList } from "./resume-list";

export const DashboardPageContent = () => {
  return (
    <div className="pt-5 px-7 max-w-4xl mx-auto">
      <DashboardHeader />
      <ResumeList
        className="mt-8"
        resumes={[
          {
            date: new Date(),
            description: "AI-ML",
            title: "AI Engineer",
          },
          {
            date: new Date(),
            description: "DSA",
            title: "Problem Solver",
          },
        ]}
      />
    </div>
  );
};
