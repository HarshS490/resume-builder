"use client";

import LogoutButton from "@/features/auth/components/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

function UserAvatar({className} : {className ?: string}) {
  const session = useSession()
  const name = session.data?.user?.name || "User";
  const image = session.data?.user?.image || "";
  const email = session.data?.user?.email || "User@mail.com"
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className={cn("size-10 hover:opacity-75 transition border border-neutral-300", className)}>
          <AvatarImage src={image} />
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            <Loader className="size-4 animate-spin" />
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="mx-4 flex flex-col">
        <div className="flex flex-col items-center my-4">
          <Avatar className="size-14 hover:opacity-75 transition border border-neutral-300">
            <AvatarImage src={image} />
            <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
              <Loader className="size-4 animate-spin" />
            </AvatarFallback>
          </Avatar>
          <span className="font-semibold mt-4">{name}</span>
          <span>{email}</span>
        </div>
        <LogoutButton>Logout</LogoutButton>
      </PopoverContent>
    </Popover>
  );
}

export { UserAvatar };
