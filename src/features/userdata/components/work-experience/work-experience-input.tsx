"use client";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { useCustomTable } from "../../hooks/use-custom-table";
import {
  resumeSchemaType,
  WorkExperience,
  WorkExperienceDetailSchema,
} from "../../schemas";
import { TableDisplay } from "../table-display";
import { workExperienceColumns } from "./columns";

const NewWorkExperienceDialog = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<WorkExperience>;
  onSubmit: (data: WorkExperience) => void;
}) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 px-6 py-4"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-black/80">
                Role
              </FormLabel>
              <FormControl>
                <Input placeholder="Software Engineer" {...field} />
              </FormControl>
              <FormDescription>The role you had in the company</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-black/80">
                Company Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Salesforce" {...field} />
              </FormControl>
              <FormDescription>
                The name of the company you worked at
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex items-center gap-5">
                <FormLabel className="mr-1.5">From</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-[240px] pl-3 text-left font-normal")}
                      >
                        {field.value ? (
                          field.value.toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex items-center gap-5">
                <FormLabel className="mr-1.5">Till</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn("w-[240px] pl-3 text-left font-normal")}
                      >
                        {field.value ? (
                          field.value === "current" ? (
                            <span>Present</span>
                          ) : (
                            field.value.toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      showOutsideDays={false}
                      mode="single"
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={(e) => {
                    // avoid form submission
                    e.preventDefault();
                    form.setValue("endDate", "current");
                  }}
                  variant="outline"
                >
                  Present
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="aboutRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-black/80">
                About your role
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I was lead of my team working on..."
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="achievements"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold text-black/80">
                Your achievements
              </FormLabel>
              <FormControl>
                <Input disabled={true} placeholder="TODO" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add</Button>
      </form>
    </Form>
  );
};

export const WorkExperienceInput = ({
  form,
}: {
  form: UseFormReturn<resumeSchemaType>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "work_experience",
    shouldUnregister: true,
  });

  const table = useCustomTable({
    fields,
    remove,
    columns: workExperienceColumns,
  });

  const miniForm = useForm<WorkExperience>({
    resolver: zodResolver(WorkExperienceDetailSchema),
    defaultValues: {
      aboutRole: "",
      achievements: [],
      company: "",
      endDate: "current",
      role: "",
      startDate: new Date(),
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: WorkExperience) => {
    setOpen(false);
    append(data);
  };

  return (
    <>
      <TableDisplay columns={workExperienceColumns} table={table} />
      <Button
        className="flex items-center mt-1.5"
        onClick={() => setOpen(true)}
      >
        <PlusCircle />
        Add new work experience
      </Button>
      <ResponsiveModal
        onOpenChange={setOpen}
        open={open}
        title="Add new work experience"
      >
        <NewWorkExperienceDialog form={miniForm} onSubmit={onSubmit} />
      </ResponsiveModal>
    </>
  );
};
