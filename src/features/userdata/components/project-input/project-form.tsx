"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import {
  projectLinksSchema,
  projectSchema,
  projectTagSchema,
} from "../../schemas";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { KeyboardEventHandler, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";

export type AddProjectFormProps = {
  initialValue?: Partial<z.infer<typeof projectSchema>>;
  className?: string;
  action ?: "Edit" | "Add"
  onSubmit: (value: z.infer<typeof projectSchema>) => void;
};
export const ProjectForm = ({
  initialValue,
  className,
  onSubmit,
  action,
}: AddProjectFormProps) => {
  action ??= "Add"
  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      project_title: initialValue?.project_title ?? "",
      project_description: initialValue?.project_description ?? "",
      project_links: initialValue?.project_links ?? [],
      project_tags: initialValue?.project_tags ?? [],
    },
    shouldUnregister: true,
  });

  return (
    <div className={className}>
      <h2 className="text-foreground w-full text-center py-6 text-xl font-bold">
        {action} Project
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name={`project_title`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-foreground text-sm">
                    Project title
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Project Title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`project_description`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-foreground text-sm">
                    Project Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      placeholder="Describe your project in few words..."
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ProjectTagsForm />
            <ProjectLinksForm />
            <Button
              className="w-full flex justify-center items-center text-background"
              type="submit"
            >
              <PlusCircleIcon className="size-4" />
              <span>{action} Project</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

type TextCommandItemProps = {
  value: string;
  onClick?: (value: string) => void;
};
const TextCommandItem = ({ value, onClick }: TextCommandItemProps) => {
  const onClickHandler = () => {
    onClick?.(value);
  };
  return (
    <div onClick={onClickHandler} className="cursor-pointer contents">
      <CommandItem>{value}</CommandItem>
    </div>
  );
};

const tempValues = ["Item1", "item2", "Item3"];

const ProjectTagsForm = () => {
  const [isFocus, setIsFocus] = useState(false);

  const form = useForm<z.infer<typeof projectTagSchema>>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(projectTagSchema),
    shouldUnregister: true,
  });

  const { control, getValues } =
    useFormContext<z.infer<typeof projectSchema>>();
  const { append, fields, remove } = useFieldArray({
    control,
    name: "project_tags",
  });

  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        fieldRef.current &&
        !fieldRef.current.contains(event.target as Node)
      ) {
        setIsFocus(false);
        form.clearErrors();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (value: z.infer<typeof projectTagSchema>) => {
    const project_tags = getValues().project_tags;
    const idx = project_tags.findIndex((item) => item.value === value.value);
    if (idx === -1) {
      form.clearErrors();
      append(value);
      return true;
    } else {
      form.setError("value", {
        type: "custom",
        message: "This skill already added choose another skill",
      });
      return false;
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      const isValid = await form.trigger("value");
      if (isValid) {
        const isSubmitted = onSubmit(form.getValues());
        if (isSubmitted) {
          form.resetField("value");
        }
      }
    }
  };

  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <div ref={fieldRef} className="mb-6">
            <FormItem>
              <FormLabel className="font-bold text-foreground text-sm">
                Project tags
              </FormLabel>
              <Command className="rounded-lg border border-border relative">
                <CommandInput
                  {...field}
                  onValueChange={field.onChange}
                  placeholder="Select the skills associated with this project"
                  onClick={() => setIsFocus(true)}
                  onFocus={() => setIsFocus(true)}
                  onKeyDown={handleKeydown}
                />
                {isFocus && (
                  <CommandList>
                    <div className="h-40">
                      <CommandGroup>
                        <TextCommandItem
                          {...field}
                          onClick={() => form.handleSubmit(onSubmit)()}
                          value={field.value}
                        />
                      </CommandGroup>
                      <CommandGroup
                        heading="Your skills"
                        className="overflow-auto"
                      >
                        {tempValues.map((val) => (
                          <TextCommandItem
                            key={val}
                            onClick={() => onSubmit({ value: val })}
                            value={val}
                          />
                        ))}
                      </CommandGroup>
                    </div>
                  </CommandList>
                )}
              </Command>
              <FormMessage />
              <div className="flex gap-2 mb-4">
                {fields.map((item, index) => {
                  return (
                    <Badge
                      variant={"secondary"}
                      className="text-xs flex items-center justify-center"
                      key={item.value}
                      onClick={() => {
                        form.clearErrors();
                        remove(index);
                      }}
                    >
                      <span>{item.value}</span>
                    </Badge>
                  );
                })}
              </div>
            </FormItem>
          </div>
        )}
      />
    </Form>
  );
};

const ProjectLinksForm = () => {
  const form = useForm<z.infer<typeof projectLinksSchema>>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(projectLinksSchema),
    shouldUnregister: true,
  });

  const { control } = useFormContext<z.infer<typeof projectSchema>>();
  const { append, fields, remove } = useFieldArray({
    control,
    name: "project_links",
  });

  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (ev: Event) => {
      if (fieldRef.current && !fieldRef.current.contains(ev.target as Node)) {
        form.clearErrors();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onSubmit = (value: z.infer<typeof projectLinksSchema>) => {
    const idx = fields.findIndex((link) => link.value === value.value);
    if (idx === -1) {
      form.clearErrors();
      append(value);
      return true;
    } else {
      form.setError("value", {
        type: "custom",
        message: "This URL has already been added",
      });
    }
  };

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      const isValid = await form.trigger("value");
      if (isValid) {
        const isSubmitted = onSubmit(form.getValues());
        if (isSubmitted) {
          form.resetField("value");
        }
      }
    }
  };
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="value"
        render={({ field }) => (
          <div ref={fieldRef} className="mb-6">
            <FormItem>
              <FormLabel className="font-bold text-foreground text-sm">
                Project Links
              </FormLabel>
              <Input
                {...field}
                placeholder="Add links related to the project..."
                onKeyDown={handleKeydown}
              />
              <FormMessage />
              <div className="flex gap-2 mb-4">
                {fields.map((item, index) => {
                  return (
                    <Badge
                      variant={"secondary"}
                      className="text-xs flex items-center justify-center"
                      key={item.value}
                      onClick={() => {
                        form.clearErrors();
                        remove(index);
                      }}
                    >
                      <span>{item.value}</span>
                    </Badge>
                  );
                })}
              </div>
            </FormItem>
          </div>
        )}
      />
    </Form>
  );
};
