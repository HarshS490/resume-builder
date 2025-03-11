"use client"

import { useCreateModal } from "@/hooks/use-create-modal"

export const useGithubRepoTableModal = () => {
  return useCreateModal({name : "github-repo"})
}