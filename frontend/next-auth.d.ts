import { type DefaultSession } from "next-auth";
import { ITokenResponse, IUser } from "./types";

declare module "next-auth" {
  interface User extends IUser {
    tokens: ITokenResponse;
    // isTwoFactorEnabled: boolean;
    // isOAuth: boolean;
    // accessToken: string;
    // refreshToken: string;
  }

  interface Session {
    // user: IUser & DefaultSession["user"];
    user: IUser & { tokens: ITokenResponse };
    isValid: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    // user: IUser & DefaultSession["user"];
    user: IUser;
    tokens?: ITokenResponse;
  }
}
