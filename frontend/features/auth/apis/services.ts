import apiClient from "~/utils/axios";
import { ILoginInput, ILoginResponse, ISignupResponse, ISignupInput, ISocialLoginInput, ISocialLoginResponse } from "./dto";

export const credentialLogin = async (body: ILoginInput) => {
  const { data } = await apiClient.post<ILoginResponse>('/auth/login', body);
  return data;
};

export const socialLogin = async (body: ISocialLoginInput) => {
  const { data } = await apiClient.post<ISocialLoginResponse>('/auth/login/google', body);
  return data;
};

export const signUp = async (body: ISignupInput) => {
  const { data } = await apiClient.post<ISignupResponse>('/auth/register', body);
  return data;
};
