import { auth } from "@/lib/auth/auth";
import LoginButton from "./login-button";
import LogoutButton from "./logout-button";

const Page = async () => {
  const session = await auth();
  return (
    <div>
      <div>{session?.user?.email ?? "Not logged in"}</div>
      {session ? <LogoutButton /> : <LoginButton />}
    </div>
  );
};

export default Page;
