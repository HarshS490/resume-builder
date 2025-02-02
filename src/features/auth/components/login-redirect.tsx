"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginRedirect = ({ children }: { children?: React.ReactNode }) => {
  const { status } = useSession();
  const router = useRouter();
  if (status === "authenticated") {
    router.replace("/dashboard");
  }
  return children;
};

export default LoginRedirect;
