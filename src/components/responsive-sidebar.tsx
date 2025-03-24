"use client";

import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Button } from "./ui/button";

export const ResponsiveSidebar = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { sidebarState, setSidebar } = useSidebar({ name: "app-sidebar" });
  return (
    <div
      className={cn(
        "fixed flex sm:flex-col bottom-0 inset-x-0 w-full sm:bottom-auto sm:inset-x-auto sm:left-0 sm:inset-y-0 bg-zinc-900 text-zinc-300 transition sm:w-auto sm:min-w-fit",
        sidebarState === "expanded" ? "sm:w-32 sm:px-2" : "sm:w-16 px-1 md:px-3"
      )}
    >
      {/* Collapse button */}
      <div className="hidden absolute top-4 left-1/2 -translate-x-1/2 sm:flex items-center">
        <Button
          className="[&_svg]:size-5 text-zinc-300"
          onClick={() =>
            setSidebar({
              state: sidebarState === "collapsed" ? "expanded" : "collapsed",
            })
          }
        >
          {sidebarState === "collapsed" ? (
            <PanelRightClose />
          ) : (
            <PanelLeftClose />
          )}
          {sidebarState === "collapsed" ? null : (
            <span className="text-sm md:text-base">Collapse</span>
          )}
        </Button>
      </div>
      <div className="flex sm:flex-col items-center justify-center sm:justify-between w-full sm:w-auto h-full sm:pt-24">
        {children}
      </div>
    </div>
  );
};
