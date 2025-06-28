import { ApiResponse, ITokenResponse } from "~/types";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface ISocialLoginInput {
  access_token: string;
  provider: 'google';
}

export interface ISignupInput {
  name: string;
  email: string;
  password: string;
}


export type ILoginResponse = ApiResponse<ITokenResponse>;
export type ISocialLoginResponse = ApiResponse<ITokenResponse>;
export type ISignupResponse = ApiResponse<ITokenResponse>;
