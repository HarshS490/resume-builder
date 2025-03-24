"use client";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";
import { FileCheck2 } from "lucide-react";
import { ResponsiveSidebar } from "./responsive-sidebar";
import { UserAvatar } from "./user-avatar";

function SidebarNav({ children }: { children: React.ReactNode }) {
  const { sidebarState } = useSidebar({ name: "app-sidebar" });
  return (
    <>
      <nav>
        <ResponsiveSidebar>
          {/* Menu */}
          <div className="flex sm:flex-col gap-2 sm:gap-5 w-full sm:w-auto sm:justify-center">
            <button className="flex gap-2 items-center p-3 rounded-xl bg-zinc-400 text-zinc-900 mx-2">
              <FileCheck2
                className={cn("size-4", {
                  "md:size-5": sidebarState === "collapsed",
                })}
              />
              {sidebarState === "collapsed" ? (
                <span className="sm:hidden text-xs md:text-sm lg:text-base">
                  Library
                </span>
              ) : (
                <span className="text-xs md:text-sm lg:text-base">Library</span>
              )}
            </button>
            {/* NOTE: Example to add another section:- */}
            {/* <button className="flex gap-2 items-center p-3 rounded-xl mx-2 bg-zinc-800">
            <DraftingCompass
              className={cn("size-4", {
                "md:size-5": sidebarState === "collapsed",
              })}
            />
            {sidebarState === "collapsed" ? (
              <span className="sm:hidden text-xs md:text-sm lg:text-base">
                Drafts
              </span>
            ) : (
              <span className="text-xs md:text-sm lg:text-base">Drafts</span>
            )}
          </button> */}
          </div>
          {/* User */}
          <UserAvatar className="m-4 border-none ring-2 ring-zinc-700" />
        </ResponsiveSidebar>
      </nav>
      <main
        className={cn(
          "max-sm:pl-3 mb-16",
          sidebarState === "collapsed" ? "sm:pl-[6.5rem]" : "sm:pl-[9rem]"
        )}
      >
        {children}
      </main>
    </>
  );
}

export { SidebarNav };
