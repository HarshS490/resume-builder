"use client";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { extraActivitySchema, resumeSchema } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type ExtraActivitiesInputProps = {
  form: UseFormReturn<z.infer<typeof resumeSchema>>;
};

export const ExtraActivitiesInput = ({ form }: ExtraActivitiesInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const {
    fields: extraActivityFields,
    append,
    remove,
    update,
  } = useFieldArray({
    control: form.control,
    name: "extraactivity",
    shouldUnregister: true,
  });

  const onAddExtraActivity = () => {
    setIsOpen(true);
  };
  const onCancel = () => {
    setIsOpen(false);
    setEditIndex(-1);
  };

  const onSubmit = (value: z.infer<typeof extraActivitySchema>) => {
    if (isOpen) {
      if (editIndex === -1) {
        append(value);
      } else {
        update(editIndex, value);
        setEditIndex(-1);
      }
      setIsOpen(false);
    }
  };

  const onEdit = (index: number) => {
    setIsOpen(true);
    setEditIndex(index);
  };

  return (
    <Card className="bg-background rounded-none shadow-none">
      <CardHeader>
        <CardTitle>Extra Activity</CardTitle>
        <CardDescription>Describe your Extra Activity</CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-2">
        {extraActivityFields.map((field, index) => {
          const disabled = editIndex !== -1 && index !== editIndex;
          return (
            <div
              key={field.id}
              className={cn(
                "w-full flex border-border border p-2 rounded-md group min-h-[54px] relative",
                disabled && "bg-neutral-200 text-muted-foreground "
              )}
            >
              <span className="w-full flex items-center px-2 overflow-hidden">
                <span className="break-all line-clamp-4 text-ellipsis text-sm">
                  {field.value}
                </span>
              </span>
              <div className="absolute hidden gap-2 shrink-0 group-hover:flex bottom-0 right-0 m-2 bg-white">
                <Button
                  variant={index === editIndex ? "default" : "outline"}
                  size={"sm"}
                  disabled={editIndex !== -1}
                  onClick={() => onEdit(index)}
                >
                  <EditIcon />
                </Button>
                <Button
                  size={"sm"}
                  variant={"destructive"}
                  onClick={() => remove(index)}
                  disabled={editIndex !== -1}
                >
                  <Trash2Icon />
                </Button>
              </div>
            </div>
          );
        })}
        {isOpen ? (
          editIndex === -1 ? (
            <AddExtraActivitysForm onCancel={onCancel} onSubmit={onSubmit} />
          ) : (
            <EditExtraActivitysForm
              initialValues={extraActivityFields[editIndex]}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
          )
        ) : (
          <Button
            variant="default"
            className="flex justify-center items-center w-full lg:w-56 my-10"
            onClick={onAddExtraActivity}
          >
            <PlusCircleIcon className="size-4" />
            Add Extra Activity
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

type EditExtraActivitysFormProps = {
  onSubmit?: (value: z.infer<typeof extraActivitySchema>) => void;
  onCancel?: () => void;
  initialValues: z.infer<typeof extraActivitySchema>;
};

export const EditExtraActivitysForm = ({
  onCancel,
  onSubmit,
  initialValues,
}: EditExtraActivitysFormProps) => {
  const form = useForm<z.infer<typeof extraActivitySchema>>({
    resolver: zodResolver(extraActivitySchema),
    defaultValues: initialValues,
  });

  const handleKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (onSubmit) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSubmit) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <Textarea
                {...field}
                className="resize-none"
                rows={4}
                placeholder="Describe your ExtraActivity in few words..."
                onKeyDown={handleKeydown}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full lg:self-end">
          <Button
            className="w-full lg:w-auto"
            variant={"default"}
            onClick={handleSubmit}
          >
            <PlusCircleIcon />
            <span>Save Changes</span>
          </Button>
          <Button
            className="w-full lg:w-auto"
            variant={"destructive"}
            onClick={onCancel}
          >
            <Trash2Icon />
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </Form>
  );
};

type AddExtraActivitysFormProps = {
  onSubmit?: (value: z.infer<typeof extraActivitySchema>) => void;
  onCancel?: () => void;
};
export const AddExtraActivitysForm = ({
  onCancel,
  onSubmit,
}: AddExtraActivitysFormProps) => {
  const form = useForm<z.infer<typeof extraActivitySchema>>({
    resolver: zodResolver(extraActivitySchema),
    defaultValues: { value: "" },
  });

  const handleKeydown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      if (onSubmit) {
        form.handleSubmit(onSubmit)();
      }
    }
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSubmit) {
      form.handleSubmit(onSubmit)();
    }
  };

  return (
    <Form {...form}>
      <div className="w-full flex flex-col gap-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <Textarea
                {...field}
                className="resize-none"
                rows={4}
                placeholder="Describe your ExtraActivity in few words..."
                onKeyDown={handleKeydown}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 w-full lg:self-end">
          <Button
            className="w-full lg:w-auto"
            variant={"default"}
            onClick={handleSubmit}
          >
            <PlusCircleIcon />
            <span>Add</span>
          </Button>
          <Button
            className="w-full lg:w-auto"
            variant={"destructive"}
            onClick={onCancel}
          >
            <Trash2Icon />
            <span>Cancel</span>
          </Button>
        </div>
      </div>
    </Form>
  );
};
