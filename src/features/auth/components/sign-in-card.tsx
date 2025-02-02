import { AuthProviderStrings } from "@/lib/auth/providers";
import LoginButton from "./login-button";
import Link from "next/link";

const SignInCard = ({ from }: { from?: string | undefined }) => {
  return (
    <main className="w-[80%] h-[80%] bg-white flex">
      <div className="flex-1 flex flex-col px-20 py-16 text-center">
        <h1 className="text-5xl tracking-tighter font-thin text-black/85">
          Resume Builder
        </h1>
        <p className="text-muted-foreground mt-2">
          Sign in for your personalized resume
        </p>
        <div className="h-full w-full flex flex-col gap-1.5 justify-center max-w-[60%] mx-auto">
          {AuthProviderStrings.map((provider) => (
            <LoginButton key={provider} provider={provider} to={from}>
              Login with {provider}
            </LoginButton>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          By logging in, you agree to our{" "}
          <Link
            className="text-blue-500 underline hover:no-underline"
            href="/toc"
          >
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link
            className="text-blue-500 underline hover:no-underline"
            href="/privacy"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="flex-1 bg-zinc-400"></div>
    </main>
  );
};

export default SignInCard;
