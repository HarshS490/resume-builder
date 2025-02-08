"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { useGetGithubUser } from "./use-get-github-user";

function useGetGithubUserRepositories() {
  const {data : user_data} = useGetGithubUser()
  const query = useQuery({
    queryKey: ["github", "user", user_data?.status],
    queryFn: async () => {
      if (user_data?.status !== "Authenticated") {
        throw new Error("User not authenticated with github");
      }
      console.log("User", user_data)
      const repo_data_res =
        await client.api.userdata.github.user.repositories.$get();
      if (!repo_data_res.ok) {
        throw new Error("Failed to fetch data");
      }
      return await repo_data_res.json();
    },
    enabled: user_data?.status === "Authenticated"
  });
  return query;
}

export { useGetGithubUserRepositories };
