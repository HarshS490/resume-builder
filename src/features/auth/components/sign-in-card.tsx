"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function SignInCard() {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter()

  const loginWithGithubHandler = async () => {
    setDisabled(true)
    try {
      await signIn('github',{redirect:false})
      toast.success('Signed in successfully')
    } catch {
      toast.error("Failed to sign in ")
      setDisabled(false)
    }
    router.refresh()
  }

  return (
    <Card className="w-full h-full md:w-[487px] border-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
      </CardHeader>
      <CardContent className="p-7 flex flex-col gap-y-4">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          disabled={disabled}
          onClick={()=>{}}
        >
          <FcGoogle className="mr-2 size-5" />
          Login with Google
        </Button>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          onClick={loginWithGithubHandler}
          disabled={disabled}
        >
          <FaGithub className="mr-2 size-5"></FaGithub>
          Login with Github
        </Button>
      </CardContent>
      <div className="p-7  flex items-center justify-center">
        <p>
          Don&apos;t have an account?
          <Link href="/sign-up" className="text-blue-700">
            &nbsp;Sign Up
          </Link>
        </p>
      </div>
    </Card>
  );
}

export { SignInCard };
