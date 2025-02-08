"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { resumeSchemaType } from "../schemas";

type JobDescriptionInputProps = {
  form: UseFormReturn<resumeSchemaType>;
};

export const JobDescriptionInput = ({ form }: JobDescriptionInputProps) => {
  return (
    <Card className="bg-background rounded-none shadow-none">
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>
          Enter job description(if any)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="job_description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} placeholder="Enter job description..." className={cn("resize-none max-h-96  min-h-[200px] h-full field-sizing-content",field.value && "border-transparent hover:border-border focus-visible:border-border")} />
              </FormControl>
            </FormItem>
          )}
          />
          <p className="text-sm text-muted-foreground mt-2">Job description will help in tailoring the resume</p>
      </CardContent>
    </Card>
  );
};
