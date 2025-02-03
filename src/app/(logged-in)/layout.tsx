"use server";
import { Navbar } from "@/components/navbar";
import EnsureLoggedIn from "@/features/auth/components/ensure-logged-in";
// Colors are temporary to see if everything fits in intended layout or not
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-[2160px] min-h-screen bg-orange-100 overflow-hidden">
      <Navbar />
      <main className="w-full">
        <EnsureLoggedIn>{children}</EnsureLoggedIn>
      </main>
    </div>
  );
}
