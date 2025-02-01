"use client";
import { signIn } from "next-auth/react";

const LoginButton = () => {
  return (
    <button onClick={async () => await signIn("github")}>
      Login with github
    </button>
  );
};

export default LoginButton;
