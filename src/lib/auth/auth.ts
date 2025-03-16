import NextAuth, { NextAuthConfig } from "next-auth";
import { AuthProviders } from "./providers";
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "../prisma";

export const authOptions: NextAuthConfig = {
  providers: AuthProviders,
  // adapter: PrismaAdapter(prisma),
  callbacks: {
    session({session, token}) {
      if (session) {
        session.userId = token?.sub as string;
      }
      return session;
    }
  }
};
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
