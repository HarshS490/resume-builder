"use client"

import { Button, ButtonProps } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

type LogoutButtonProps = ButtonProps

function LogoutButton({...props}:LogoutButtonProps) {
  const router = useRouter()
  const onClickHandler = async () => {
    await signOut({redirect: false})
    router.refresh()
  }
  
  return <Button {...props} onClick={onClickHandler}>Sign Out</Button>;
}

export { LogoutButton };