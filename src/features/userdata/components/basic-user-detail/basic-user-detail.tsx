"use client";

import { useController, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { basicUserDetailSchema, resumeSchema } from "../../schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type BasicUserDetailProps = {
  form: UseFormReturn<z.infer<typeof resumeSchema>>;
};
export const BasicUserDetail = ({ form }: BasicUserDetailProps) => {
  return (
    <Card className="bg-background rounded-none shadow-none">
      <CardHeader>
        <CardTitle>Basic Details</CardTitle>
        <CardDescription>Enter project details</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="name.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <Input {...field} placeholder="first name" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name.middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle name</FormLabel>
              <Input {...field} placeholder="middle name" />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name.lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <Input {...field} placeholder="last name" />
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
