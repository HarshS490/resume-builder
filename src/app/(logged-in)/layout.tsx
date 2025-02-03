"use server";

import EnsureLoggedIn from "@/features/auth/components/ensure-logged-in";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EnsureLoggedIn>{children}</EnsureLoggedIn>;
}
