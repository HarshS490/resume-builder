"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const SubmitSection = () => {
  return (
    <Card className={cn("shadow-none border-none rounded-none")}>
      <CardHeader>
        <Button type="submit" className="w-full md:max-w-[200px] ml-auto">
          Submit
        </Button>
      </CardHeader>
    </Card>
  );
};
