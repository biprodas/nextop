import NextAuth from "next-auth";
import authConfig from "~/auth.config";

export const {
  handlers: authHandlers,
  signIn,
  signOut,
  auth: authSession,
} = NextAuth(authConfig);
