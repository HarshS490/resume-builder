"use client";

import { cn } from "@/lib/utils";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

const LandingNavbar = () => {
  return (
    <nav className="fixed h-20 inset-x-0 backdrop-blur-md bg-white/80 flex items-center justify-between px-12 py-5">
      <div className="font-bold tracking-tighter">LOGO</div>
      <div>
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "text-base"
          )}
        >
          <LogIn /> Login
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
