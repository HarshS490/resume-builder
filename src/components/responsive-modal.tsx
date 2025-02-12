import React from "react";
import { useMedia } from "react-use";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";

type ResponsiveModalProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
};

export const ResponsiveModal = ({
  children,
  open,
  onOpenChange,
  title,
}: ResponsiveModalProps) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="w-full sm:max-w-lg p-0 border-none overflow-y-auto hide-scrollbar max-h-[85vh]">
          <DialogHeader className="hidden">
            <DialogTitle className="text-center mt-12">{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerHeader className="hidden">
        <DrawerTitle className="text-center">{title}</DrawerTitle>
      </DrawerHeader>
      <DrawerContent className="max-h-[85vh]">
        <div className="max-h-full overflow-y-auto hide-scrollbar">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};
