import NextAuth, { NextAuthConfig } from "next-auth";
import { AuthProviders } from "./providers";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../prisma";

export const authOptions: NextAuthConfig = {
  providers: AuthProviders,
  adapter: PrismaAdapter(prisma),
};
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
