"use client";

import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";

function useRegisterGithub() {
  const mutation = useMutation({
    mutationFn: async ({code}:{code : string}) => {
      const res = await client.api.userdata.register.github.$post({
        query: { code },
      });

      if (!res.ok) {
        throw new Error("Failed to register with github")
      }
    },
  });

  return mutation;
}

export { useRegisterGithub };
