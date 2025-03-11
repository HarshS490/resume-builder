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
import { Edit, ImportIcon, PlusCircle, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAddProjectModal } from "../../hooks/use-add-project-modal";
import { ProjectFormModal } from "./project-form-modal";
import { projectSchema, resumeSchema } from "../../schemas";
import { z } from "zod";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useGetGithubUser } from "../../api/use-get-github-user";
import { GithubRepoTableModal } from "./github-project-picker";
import { useGithubRepoTableModal } from "../../hooks/use-github-repo-table-modal";
import { githubRepositoryResponseType } from "../../types";

type ProjectsInputProps = {
  form: UseFormReturn<z.infer<typeof resumeSchema>>;
  className?: string;
};

const defaultProjectValue = getDefaultValues(projectSchema);

export const ProjectsInput = ({ form, className }: ProjectsInputProps) => {
  const { open, close } = useAddProjectModal();
  const { open: openRepoTable, close: closeRepoTable } = useGithubRepoTableModal();
  const [currIndex, setCurrIndex] = useState(-1);
  const { data: githubUser } = useGetGithubUser();

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
    setCurrIndex(-1);
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

  const onOpenRepoTable = async () => {
    await openRepoTable();
  };

  const onEditProject = async (index: number) => {
    setCurrIndex(index);
    await open();
  };
  const onDeleteProject = (index: number) => {
    remove(index);
  };
  const onAddGithubProject = async (items: githubRepositoryResponseType[]) => {
    console.log(items)
    items.map(project => {
      const project_links = []
      if (project.html_url) {
        project_links.push({value: project.html_url})
      }
      if (project.homepage) {
        project_links.push({value : project.homepage})
      }
      append({
        project_title: project.name, 
        project_description: "", 
        project_links: project_links, 
        project_tags: []
      })
    })
    await closeRepoTable()
  }
  const currentProject =
    currIndex === -1 ? defaultProjectValue : projects[currIndex];
  return (
    <Card
      className={cn(
        "bg-background rounded-none shadow-none border-none",
        className
      )}
    >
      <ProjectFormModal
        action={currIndex === -1 ? "Add" : "Edit"}
        initialValue={currentProject}
        onSubmit={onSubmitProject}
        className="px-12 pb-12"
      />
      <GithubRepoTableModal onAdd={onAddGithubProject} />
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
            <div className="flex col-span-full items-center justify-center text-xl text-muted-foreground border-black/40 border-[3px] rounded-xl border-dashed h-[130px]">
              No project details added
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex justify-center items-center w-full md:w-56 my-10"
            onClick={onAddProject}
          >
            <PlusCircle className="size-4" />
            Add Project
          </Button>
          <Button
            variant="ghost"
            disabled={githubUser?.status !== "Authenticated"}
            className="flex justify-center items-center w-full md:w-56 my-10 bg-green-700 text-white hover:bg-green-800 hover:text-white"
            onClick={onOpenRepoTable}
          >
            <ImportIcon className="size-4" />
            {githubUser?.status !== "Authenticated"
              ? "Connect to github to import"
              : "Import from Github"}
          </Button>
        </div>
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
