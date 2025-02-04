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
  EducationDetailSchema,
  EducationDetails,
} from "./education-detail-schema";
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

const NewEducationDetailDialog = ({
  setData,
}: {
  setData: React.Dispatch<React.SetStateAction<EducationDetails[]>>;
}) => {
  const form = useForm<EducationDetails>({
    resolver: zodResolver(EducationDetailSchema),
    defaultValues: {
      endDate: "current",
      institution: "",
      qualification: "",
      score: 0,
      startDate: new Date(Date.now()),
    },
  });

  const [open, setOpen] = useState(false);

  const onSubmit = (data: EducationDetails) => {
    setOpen(false);
    setData((prev) => [...prev, data]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center ml-auto mt-1.5">
          <PlusCircle />
          Add new education detail
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>
          <DialogHeader>Add new education detail</DialogHeader>
        </DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-black/80">
                    Qualification/Degree
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="B.Tech." {...field} />
                  </FormControl>
                  <FormDescription>
                    The degree / qualification you received
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-black/80">
                    School/College
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Delhi Technological University"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The institution where you received the qualification
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
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-black/80">
                    CGPA/Percentage
                  </FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="9.7" {...field} />
                  </FormControl>
                  <FormDescription>
                    The score you received in the qualification
                  </FormDescription>
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

export default NewEducationDetailDialog;
