import { UserAvatar } from "./user-avatar";

function Navbar() {
  return (
    <nav className="px-6 py-2 flex items-center bg-red-100">
      <div className="flex-grow"></div>
      <UserAvatar className="m-4" />
    </nav>
  );
}

export { Navbar };
