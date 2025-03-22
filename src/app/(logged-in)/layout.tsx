"use server";
import { Navbar } from "@/components/navbar";
import EnsureLoggedIn from "@/features/auth/components/ensure-logged-in";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full relative max-w-[2160px] min-h-screen overflow-hidden">
      <Navbar />
      <main className="w-full">
        <EnsureLoggedIn>{children}</EnsureLoggedIn>
      </main>
    </div>
  );
}
