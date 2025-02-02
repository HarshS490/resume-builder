"use client";

import { Button } from "@/components/ui/button";
import { AuthProviderLogos } from "@/lib/auth/providers";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

const LoginButton = ({
  children,
  className,
  provider,
  to,
}: {
  children: React.ReactNode;
  className?: string;
  provider: "github" | "google";
  to?: string | undefined;
}) => {
  const logo = AuthProviderLogos[provider];
  return (
    <Button
      className={cn("inline-flex items-center gap-1.5", className)}
      onClick={async () =>
        await signIn(provider, {
          redirectTo: to ?? "/dashboard",
        })
      }
    >
      {logo && <span>{logo}</span>}
      <span>{children}</span>
    </Button>
  );
};

export default LoginButton;
