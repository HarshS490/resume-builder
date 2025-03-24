"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

import { z } from "zod";
import { resumeSchema } from "../schemas";

export const MultiStepFormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
};
