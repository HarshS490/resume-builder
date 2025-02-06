"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WorkExperienceDetailSchema,
  WorkExperience,
} from "./work-experience-schema";
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
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const NewWorkExperienceDialog = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<WorkExperience[]>>;
}) => {
  const form = useForm<WorkExperience>({
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
    setData((prev) => [...prev, data]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center ml-auto mt-1.5">
          <PlusCircle />
          Add new work experience
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <DialogHeader>Add new work experience</DialogHeader>
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
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
                  <FormDescription>
                    The role you had in the company
                  </FormDescription>
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
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal"
                            )}
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
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal"
                            )}
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
      </DialogContent>
    </Dialog>
  );
};

export default NewWorkExperienceDialog;
