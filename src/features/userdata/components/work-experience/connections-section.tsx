"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";
import { useGetGithubUser } from "../../api/use-get-github-user";
import { cn } from "@/lib/utils";
import { useGetGithubUserRepositories } from "../../api/use-get-github-user-repositories";
import { DataTable } from "@/components/data-table";
import { repoDataColumnsDef } from "../repository-table/columns";

export const ConnectionsSection = () => {
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

  const { data: repo_data } = useGetGithubUserRepositories();
  console.log("Top level rerender")
  return (
    <Card>
      <CardHeader>
        <CardTitle>Connect</CardTitle>
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
        <DataTable columns={repoDataColumnsDef} data={repo_data ?? []} />
      </CardContent>
    </Card>
  );
};
