import { LogoutButton } from "@/features/auth/components/logout-button";
import { auth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";

export default async function Homepage() {
  const session = await auth()
  if (!session) {
    redirect('/sign-in')
  }
  return <div>
    Authenticated users should see this
    {JSON.stringify(session)}
    <LogoutButton />
    
  </div>;
}
