"use client";

import { Button } from "@/components/ui/button";
import { useGetRepositories } from "@/features/userdata/api/use-get-repositories";
import { useRegisterGithub } from "@/features/userdata/api/use-register-github";
import { useQueryClient } from "@tanstack/react-query";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

type tempSchema = {name : string}

function RepositoryView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data } = useGetRepositories({ github_user_id: "ishan130803" });
  const { mutate, isPending } = useRegisterGithub();
  const queryClient = useQueryClient()

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
  if (code && register === "true" && typeof window !== undefined && !isPending) {
    mutate(
      { code },
      { 
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: ['repos']})
          router.push(`${window.location.origin}/login`);
        },
        onError: () => {
          router.push(`${window.location.origin}/login`);
        }
      },
      
    );
  }
  return (
    <div>
      <Button onClick={onClickHandler}>Click to connect to Github to view private repositories</Button>
      {/* <div className="">{JSON.stringify(data ?? {})}</div> */}
      <div>{data?.private ? "true" : "false"}</div>
      <ul className="flex flex-col">{(data?.data as tempSchema[]).map((item) => {
        return <li key={item.name}>{item.name}</li>
      })}</ul>
    </div>
  );
}

export { RepositoryView };
