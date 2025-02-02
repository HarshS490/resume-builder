"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const EnsureLoggedIn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { status } = useSession();
  if (status === "unauthenticated") {
    router.push(`/login?from=${encodeURIComponent(pathname)}`);
  }
  return <></>;
};

export default EnsureLoggedIn;
