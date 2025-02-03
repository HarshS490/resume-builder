"use server";

import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

const LoginRedirect = async ({
  children,
  to = "/dashboard",
}: {
  children?: React.ReactNode;
  to?: string;
}) => {
  const user = await auth();
  if (user) {
    redirect(to);
  }
  return children;
};

export default LoginRedirect;
