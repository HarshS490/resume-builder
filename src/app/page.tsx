import { LogoutButton } from "@/features/auth/components/logout-button";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import { RepositoryView } from "./(auth)/login/repository-view";

export default async function Homepage() {
  const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  return (
    <div className="flex flex-col">
      Authenticated users should see this
      {JSON.stringify(session)}
      <LogoutButton />
      <RepositoryView />
    </div>
  );
}
