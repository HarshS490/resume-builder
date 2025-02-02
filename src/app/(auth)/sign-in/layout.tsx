import { ReactNode } from "react";

function SignInLayout({children}:{children:ReactNode}) {
  
  return (
    <div className="w-screen min-h-screen h-full flex items-center justify-center bg-muted-foreground">
      {children}
    </div>
  );
}

export default SignInLayout;