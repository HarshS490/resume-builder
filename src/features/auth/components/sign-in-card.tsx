import { AuthProviderStrings } from "@/lib/auth/providers";
import LoginButton from "./login-button";
import Link from "next/link";
import Image from "next/image";

const SignInCard = ({ from }: { from?: string | undefined }) => {
  return (
    <main className="w-full h-full md:w-[80%] md:h-[80%] bg-white flex rounded-md ring-1 ring-black/10 shadow-sm">
      <section className="flex-1 flex flex-col py-32 px-8 md:px-20 md:py-16 text-center">
        <h1 className="text-4xl md:text-5xl tracking-tighter font-thin text-black/85">
          Resume Builder
        </h1>
        <p className="text-muted-foreground text-sm md:text-base mt-2">
          Sign in for your personalized resume
        </p>
        {/* <div className="block md:hidden relative h-full w-full min-w-0 max-w-[60%] self-center">
          <Image
            src="/login-page.jpg"
            className="object-cover rounded-r-md"
            alt=""
            // width={1000}
            // height={1000}
            fill
          />
        </div> 
         // Removing it for now
        */}
        <div className="h-full w-full flex flex-col gap-2 md:gap-1.5 justify-center max-w-[60%] mx-auto">
          {AuthProviderStrings.map((provider) => (
            <LoginButton
              className="text-lg md:text-base"
              key={provider}
              provider={provider}
              to={from}
            >
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
      </section>
      <section className="hidden md:block flex-1">
        <Image
          src="/login-page.jpg"
          className="h-full w-full object-cover rounded-r-md"
          alt=""
          width={1000}
          height={1000}
        />
      </section>
    </main>
  );
};

export default SignInCard;
