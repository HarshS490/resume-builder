"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { useGetGithubUser } from "../../api/use-get-github-user";
import { cn } from "@/lib/utils";

type ConnectionsSectionProps = {
  className?: string;
};
export const ConnectionsSection = ({ className }: ConnectionsSectionProps) => {
  const { status } = useSession();
  const { data: github_user } = useGetGithubUser();
  const pathname = usePathname();
  const onGithubConnect = () => {
    if (github_user?.status === "Authenticated") {
      return;
    }
    const curr_url = `${window.location.origin}${pathname}`;
    const encoded_url = encodeURIComponent(curr_url);
    redirect(`/api/userdata/github/redirect?origin_uri=${encoded_url}`);
  };

  return (
    <Card className={cn("border-none rounded-none shadow-none", className)}>
      <CardHeader>
        <CardTitle>Connect</CardTitle>
        <CardDescription>
          Link your profile to import data seamlessly from other accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          type="button"
          variant={"ghost"}
          disabled={status !== "authenticated"}
          onClick={onGithubConnect}
          className={cn(
            "transition-all duration-500",
            github_user?.status === "Authenticated"
              ? "bg-green-700 text-white hover:text-white hover:bg-green-800 cursor-default"
              : "bg-black text-white hover:bg-neutral-800 hover:text-white"
          )}
        >
          {status === "authenticated" ? (
            <div className="flex gap-2 min-w-[160px] items-center justify-center">
              {github_user?.status === "Authenticated" ? (
                <CheckIcon />
              ) : (
                <FaGithub />
              )}
              <span>
                {github_user?.status === "Authenticated"
                  ? "Connected to Github"
                  : "Connect to Github"}
              </span>
            </div>
          ) : (
            <Loader2Icon className="animate-spin min-w-[160px]" />
          )}
        </Button>
        <div className="h-10" />
      </CardContent>
    </Card>
  );
};
