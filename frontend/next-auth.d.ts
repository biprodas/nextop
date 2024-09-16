import NextAuth, { type DefaultSession } from "next-auth";

// export type ExtendedUser = DefaultSession["user"] & {
//   //   role: UserRole;
//   isTwoFactorEnabled: boolean;
//   isOAuth: boolean;
//   accessToken: string;
//   refreshToken: string;
// };

// declare module "next-auth" {
//   interface Session {
//     user: ExtendedUser;
//   }
// }

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    photo: string;
    accessToken: string;
    refreshToken: string;
    idToken: string;
    exp: number;
    role: string;
  }

  interface Session {
    user: User & DefaultSession["user"];
    expires: string;
    error: string;
  }
}
