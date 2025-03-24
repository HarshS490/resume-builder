"use server";
import { SidebarNav } from "@/components/sidebar-nav";
import EnsureLoggedIn from "@/features/auth/components/ensure-logged-in";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative max-w-[2160px] min-h-screen overflow-hidden">
      <SidebarNav>
        <EnsureLoggedIn>{children}</EnsureLoggedIn>
      </SidebarNav>
    </div>
  );
}
