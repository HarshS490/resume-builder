"use client";

import { DataTable } from "@/components/data-table";
// import { Button } from "@/components/ui/button";
import { useGetRepositories } from "@/features/userdata/api/use-get-repositories";
import { useRegisterGithub } from "@/features/userdata/api/use-register-github";
import { columns } from "@/features/userdata/components/columns";
import { useQueryClient } from "@tanstack/react-query";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

function RepositoryView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data } = useGetRepositories({ github_user_id: "ishan130803" });
  const { mutate, isPending } = useRegisterGithub();
  const queryClient = useQueryClient();

  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickHandler = async () => {
    const base_url = `https://github.com/login/oauth/authorize`;
    const path = `?client_id=${process.env
      .NEXT_PUBLIC_GITHUB_CLIENT_ID!}&scope=repo&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_APP_URL! + pathname + "?register=true"
    )}&prompt=true`;
    redirect(`${base_url}${path}`);
  };
  const code = searchParams.get("code");
  const register = searchParams.get("register");
  if (
    code &&
    register === "true" &&
    typeof window !== undefined &&
    !isPending
  ) {
    mutate(
      { code },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["repos"] });
          router.push(`${window.location.origin}${pathname}`);
        },
        onError: () => {
          router.push(`${window.location.origin}${pathname}`);
        },
      }
    );
  }
  console.log(data);
  return (
    <div className="">
      {/* <Button onClick={onClickHandler}>
        Click to connect to Github to view private repositories
      </Button> */}
      <DataTable columns={columns} data={data?.data ?? []} />
    </div>
  );
}

export { RepositoryView };
