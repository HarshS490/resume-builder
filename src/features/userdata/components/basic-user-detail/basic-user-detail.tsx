"use client";

import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { resumeSchema } from "../../schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "./phone-input";
import { cn } from "@/lib/utils";

type BasicUserDetailProps = {
  form: UseFormReturn<z.infer<typeof resumeSchema>>;
  className?: string;
};
export const BasicUserDetail = ({ form, className }: BasicUserDetailProps) => {
  return (
    <Card
      className={cn(
        "bg-background rounded-none shadow-none border-none",
        className
      )}
    >
      <CardHeader>
        <CardTitle>Basic Details</CardTitle>
        <CardDescription>Enter project details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first-name">First name</FormLabel>
                <Input id="first-name" {...field} placeholder="John" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name.middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="middle-name">Middle name</FormLabel>
                <Input id="middle-name" {...field} placeholder="David" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="last-name">Last name</FormLabel>
                <Input id="last-name" {...field} placeholder="Smith" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 w-full">
          <FormField
            control={form.control}
            name="name.contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contact">Contact No.</FormLabel>
                <PhoneInput
                  id="contact"
                  className="w-full"
                  {...field}
                  international
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input id="email" {...field} placeholder="user@example.com" />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};
