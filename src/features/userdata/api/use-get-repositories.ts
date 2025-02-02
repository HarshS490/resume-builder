"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

type useGetRepositoriesProps = {
  github_user_id: string;
};

function useGetRepositories({ github_user_id }: useGetRepositoriesProps) {
  const query = useQuery({
    queryKey: ["repos"],
    queryFn: async () => {
      if (!github_user_id) {
        throw new Error("User id missing");
      }
      const res = await client.api.userdata.repos.$get({
        query: { github_user_id },
      });

      if (!res.ok) {
        throw new Error(JSON.stringify(await res.json()))
      }

      return await res.json()
    },
  });

  return query
}

export { useGetRepositories };
