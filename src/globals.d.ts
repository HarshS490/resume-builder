/* eslint-disable @typescript-eslint/no-unused-vars */
import { Session } from "next-auth"

declare module "next-auth" {
  interface Session {
    userId: string;
  }
}
