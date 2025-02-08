import { ResponsiveModal } from "@/components/responsive-modal";
import { useAddProjectModal } from "../../hooks/use-add-project-modal";
import { ProjectForm, AddProjectFormProps } from "./project-form";

type ProjectFormModal = AddProjectFormProps
export const ProjectFormModal = (props : AddProjectFormProps) => {
  const { isOpen, setIsOpen } = useAddProjectModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} title="Add Project">
      <ProjectForm {...props} />
    </ResponsiveModal>
  );
};
