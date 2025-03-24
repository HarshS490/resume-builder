"use client";

import { Button } from "@/components/ui/button";
import { ListFilter, PlusCircle } from "lucide-react";

export const DashboardHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 sm:gap-0 items-center justify-between">
      <h1 className="flex-[3] text-6xl font-semibold tracking-tight">
        Library
      </h1>
      <div className="flex-row-reverse sm:flex-row flex-1 flex gap-2 items-center justify-center">
        <Button variant="secondary">
          <ListFilter className="size-5" />
          <span className="inline-block">Filters</span>
        </Button>
        <Button>
          <PlusCircle className="size-5" />
          <span className="inline-block">Create New</span>
        </Button>
      </div>
    </div>
  );
};
