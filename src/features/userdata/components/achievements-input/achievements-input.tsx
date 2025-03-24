"use client";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { achievementSchema, resumeSchema } from "../../schemas";
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
import { EditIcon, PlusCircleIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { KeyboardEventHandler, MouseEventHandler, useState } from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type AchievementsInputProps = {
  form: UseFormReturn<z.infer<typeof resumeSchema>>;
  className?: string;
};

export const AchievementsInput = ({
  form,
  className,
}: AchievementsInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const {
    fields: achievementsField,
    append,
    remove,
    update,
  } = useFieldArray({
    control: form.control,
    name: "achievements",
    shouldUnregister: false,
  });

  const onAddAchievement = () => {
    setIsOpen(true);
  };
  const onCancel = () => {
    setIsOpen(false);
    setEditIndex(-1);
  };

  const onSubmit = (value: z.infer<typeof achievementSchema>) => {
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
    <Card
      className={cn(
        "bg-background rounded-none shadow-none border-none",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
        <CardDescription>Describe your achievements</CardDescription>
      </CardHeader>
      <CardContent className="w-full flex flex-col gap-2">
        {achievementsField.map((field, index) => {
          const disabled = editIndex !== -1 && index !== editIndex;
          return (
            <div
              key={field.id}
              className={cn(
                "w-full flex border-border border p-2 rounded-md",
                disabled && "bg-neutral-200 text-muted-foreground"
              )}
            >
              <span className="w-full flex items-center px-2 overflow-hidden">
                <span className="line-clamp-1 text-ellipsis font-semibold">
                  {field.value}
                </span>
              </span>
              <div className="flex gap-2 shrink-0">
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
            <AddAchievementsForm onCancel={onCancel} onSubmit={onSubmit} />
          ) : (
            <EditAchievementsForm
              initialValues={achievementsField[editIndex]}
              onCancel={onCancel}
              onSubmit={onSubmit}
            />
          )
        ) : (
          <Button
            variant="default"
            className="flex justify-center items-center w-full lg:w-56 my-10"
            onClick={onAddAchievement}
          >
            <PlusCircleIcon className="size-4" />
            Add Achievements
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

type EditAchievementsFormProps = {
  onSubmit?: (value: z.infer<typeof achievementSchema>) => void;
  onCancel?: () => void;
  initialValues: z.infer<typeof achievementSchema>;
};

export const EditAchievementsForm = ({
  onCancel,
  onSubmit,
  initialValues,
}: EditAchievementsFormProps) => {
  const form = useForm<z.infer<typeof achievementSchema>>({
    resolver: zodResolver(achievementSchema),
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
                placeholder="Describe your achievement in few words..."
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
            <SaveIcon />
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

type AddAchievementsFormProps = {
  onSubmit?: (value: z.infer<typeof achievementSchema>) => void;
  onCancel?: () => void;
};
export const AddAchievementsForm = ({
  onCancel,
  onSubmit,
}: AddAchievementsFormProps) => {
  const form = useForm<z.infer<typeof achievementSchema>>({
    resolver: zodResolver(achievementSchema),
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
                placeholder="Describe your achievement in few words..."
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
