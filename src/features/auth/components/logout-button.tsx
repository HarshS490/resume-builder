"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Button
      className={cn("flex items-center gap-1.5", className)}
      variant="destructive"
      onClick={async () => {
        await signOut();
      }}
    >
      <LogOut />
      {children}
    </Button>
  );
};

export default LogoutButton;
