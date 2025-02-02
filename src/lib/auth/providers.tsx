import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { FaGoogle, FaGithub } from "react-icons/fa";

export const AuthProviders = [
  Github({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
];

export const AuthProviderStrings = ["github", "google"] as const;

export const AuthProviderLogos = {
  github: <FaGithub />,
  google: <FaGoogle />,
};
