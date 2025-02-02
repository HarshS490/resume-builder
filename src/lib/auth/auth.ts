import NextAuth, { NextAuthConfig } from "next-auth";
import { AuthProviders } from "./providers";

export const authOptions: NextAuthConfig = {
  providers: AuthProviders,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session) {
        session.user.id = token?.id as string;
      }
      return session;
    },
  },
};
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
