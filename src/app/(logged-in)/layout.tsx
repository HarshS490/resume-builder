import EnsureLoggedIn from "@/features/auth/components/ensure-logged-in";

// TODO: Is it the best way to do this?

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <EnsureLoggedIn />
      {children}
    </>
  );
}
