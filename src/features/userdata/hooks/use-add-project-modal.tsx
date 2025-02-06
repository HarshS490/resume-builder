"use client"

import { useCreateModal } from "@/hooks/use-create-modal"

export const useAddProjectModal = () => {
  return useCreateModal({name : "add-project"})
}