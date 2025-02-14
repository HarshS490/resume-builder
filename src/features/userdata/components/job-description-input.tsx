"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { resumeSchemaType } from "../schemas";
import Markdown from "react-markdown";
import { useState } from "react";
import ClickawayListener from "react-click-away-listener";

type JobDescriptionInputProps = {
  form: UseFormReturn<resumeSchemaType>;
};

export const JobDescriptionInput = ({ form }: JobDescriptionInputProps) => {
  const [focus, setFocus] = useState(true);
  return (
    <Card className="bg-background rounded-none shadow-none border-none">
      <CardHeader>
        <CardTitle>Job Description</CardTitle>
        <CardDescription>Enter job description(if any)</CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="job_description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {!focus && field.value.length > 0 ? (
                  <Card
                    onClick={() => setFocus(true)}
                    className="min-h-[200px] border-none shadow-none"
                  >
                    <CardHeader className="prose px-3 py-2 prose-ul:flex prose-ul:flex-col prose-ul:gap-0 prose-sm prose-li:my-0 prose-ul:my-0 prose-p:my-0">
                      <Markdown>{field.value}</Markdown>
                    </CardHeader>
                  </Card>
                ) : (
                  <ClickawayListener onClickAway={() => setFocus(false)}>
                    <div className="contents">
                      <Textarea
                        {...field}
                        onClick={() => setFocus(true)}
                        placeholder="Enter job description..."
                        className={cn(
                          "resize-none max-h-96 min-h-[200px] h-full field-sizing-content",
                          field.value &&
                            "border-transparent hover:border-border focus-visible:border-border"
                        )}
                      />
                    </div>
                  </ClickawayListener>
                )}
              </FormControl>
            </FormItem>
          )}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Job description will help in tailoring the resume
        </p>
      </CardContent>
    </Card>
  );
};
