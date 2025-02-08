"use client";
import { useQueryState, parseAsBoolean } from "nuqs";


type useCreateModalProps = {
  name: string
}
export const useCreateModal = ({name}:useCreateModalProps) => {
  const [isOpen, setIsOpen] = useQueryState(
    name,
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
