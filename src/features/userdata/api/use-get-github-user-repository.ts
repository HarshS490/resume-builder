"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { useGetGithubUser } from "./use-get-github-user";

type useGetGithubUserRepoReadmeProps = {
  owner: string;
  repo: string;
};
function useGetGithubUserRepoReadme({
  owner,
  repo,
}: useGetGithubUserRepoReadmeProps) {
  const { data: user_data } = useGetGithubUser();
  const query = useQuery({
    queryKey: ["github", "user", user_data?.status, owner, repo],
    queryFn: async () => {
      if (user_data?.status !== "Authenticated") {
        throw new Error("User not authenticated with github");
      }
      const repo_data_res =
        await client.api.userdata.github.user.repo.readme.$get({
          query: { owner, repo },
        });
      if (!repo_data_res.ok) {
        throw new Error("Failed to fetch data");
      }
      return await repo_data_res.json();
    },
    enabled: false,
    staleTime: 1000
  });
  return query;
}

export { useGetGithubUserRepoReadme };
