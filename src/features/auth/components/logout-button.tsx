"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = ({
  children,
  asChild = false,
  className,
}: {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}) => {
  return asChild ? (
    <div className={className}>{children}</div>
  ) : (
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
