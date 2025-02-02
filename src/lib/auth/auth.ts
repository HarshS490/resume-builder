import NextAuth, { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";

export const authOptions : NextAuthConfig = {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    jwt({token, user}) {
      if (user) {
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
      if (session) {
        session.user.id = token?.id as string
      }
      return session
    },
  },
}
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
