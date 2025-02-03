"use server";

import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

const EnsureLoggedIn = async ({ children }: { children: React.ReactNode }) => {
  // server side check to ensure that user is logged in
  const user = await auth();
  if (!user) {
    redirect("/login");
  }
  return children;
};

export default EnsureLoggedIn;
