"use client";

import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";


type GithubUserResponse = {
  status: "Authenticated" | "Unauthenticated" | "Loading";
  data?: object; // Replace `any` with a proper type for GitHub user data
};

export const useGetGithubUser = () => {
  const query = useQuery<GithubUserResponse>({
    queryKey: ["github", "user"],
    queryFn: async () => {
      const res = await client.api.userdata.github.user.$get();
      const res_json = await res.json();
      if (res.ok) {
        return {
          status: "Authenticated",
          data: res_json,
        };
      } else {
        return {
          status: "Unauthenticated",
          data: res_json,
        };
      }
    },
    placeholderData: {
      status: "Loading",
      data : undefined,
    },
  });

  return query;
};
