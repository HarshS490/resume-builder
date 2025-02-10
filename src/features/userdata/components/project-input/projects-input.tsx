"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, getDefaultValues } from "@/lib/utils";
import { Edit, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAddProjectModal } from "../../hooks/use-add-project-modal";
import { ProjectFormModal } from "./project-form-modal";
import { projectSchema, resumeSchema } from "../../schemas";
import { z } from "zod";
import { useFieldArray, UseFormReturn } from "react-hook-form";

type ProjectsInputProps = {
  form: UseFormReturn<z.infer<typeof resumeSchema>>;
  className?: string
};

const defaultProjectValue = getDefaultValues(projectSchema);

export const ProjectsInput = ({ form, className }: ProjectsInputProps) => {
  const { open, close } = useAddProjectModal();
  const [currIndex, setCurrIndex] = useState(-1);

  const {
    fields: projects,
    append,
    remove,
    update,
  } = useFieldArray({
    control: form.control,
    name: "projects",
  });

  const onAddProject = async () => {
    setCurrIndex(-1)
    await open();
  };
  const onSubmitProject = async (value: z.infer<typeof projectSchema>) => {
    if (currIndex === -1) {
      append(value);
    } else {
      update(currIndex, value);
    }
    await close();
  };

  const onEditProject = async (index: number) => {
    setCurrIndex(index);
    await open();
  };
  const onDeleteProject = (index: number) => {
    remove(index);
  };
  const currentProject =
    currIndex === -1 ? defaultProjectValue : projects[currIndex];
  return (
    <Card className={cn("bg-background rounded-none shadow-none border-none", className)}>
      <ProjectFormModal
        action={currIndex === -1 ? "Add" : "Edit"}
        initialValue={currentProject}
        onSubmit={onSubmitProject}
        className="px-12 pb-12"
      />
      <CardHeader>
        <CardTitle>Projects</CardTitle>
        <CardDescription>Enter project details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 my-4">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <ProjectCard
                key={index}
                index={index}
                onEdit={onEditProject}
                onDelete={onDeleteProject}
                {...project}
              />
            ))
          ) : (
            <div className="flex items-center justify-center text-xl text-muted-foreground border-border border-4 rounded-xl border-dashed h-[130px]">
              No project details added
            </div>
          )}
        </div>
        <Button
          variant="default"
          className="flex justify-center items-center w-full lg:w-56 my-10"
          onClick={onAddProject}
        >
          <PlusCircle className="size-4" />
          Add Project
        </Button>
      </CardContent>
    </Card>
  );
};

type ProjectCardProps = {
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  index: number;
} & z.infer<typeof projectSchema>;
const ProjectCard = ({
  project_description,
  project_links,
  project_tags,
  project_title,
  onDelete,
  onEdit,
  index,
}: ProjectCardProps) => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-border rounded-md">
      <div className="flex w-full gap-1 flex-wrap">
        <span className="font-bold">{project_title}</span>
        {project_links?.length > 0 && <span>|</span>}
        {project_links?.map((item, index) => (
          <React.Fragment key={index}>
            <Link
              className="text-blue-700 underline hover:no-underline hover:text-blue-800 "
              href={item.value}
            >
              {`link${index}`}
            </Link>
            <span
              className={cn(
                index == project_links.length - 1 &&
                  project_tags?.length == 0 &&
                  "hidden"
              )}
            >
              |
            </span>
          </React.Fragment>
        ))}
        {project_tags?.map((item, index) => (
          <React.Fragment key={index}>
            <span>{item.value}</span>
            <span
              className={cn(
                "-mx-1",
                index == project_tags.length - 1 && "hidden"
              )}
            >
              ,
            </span>
          </React.Fragment>
        ))}
      </div>
      <div>{project_description}</div>
      <div className="gap-2 flex">
        <Button
          className="flex items-center justify-center size-10"
          onClick={() => onEdit?.(index)}
        >
          <Edit />
        </Button>
        <Button
          className="flex items-center justify-center size-10"
          variant={"destructive"}
          onClick={() => onDelete?.(index)}
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
};
