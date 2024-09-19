import apiClient from "~/utils/axios";
import { UserResponse } from "./dto";

export const getUsers = async () => {
  const res = await apiClient.get<UserResponse>("/api/v1/users");
  return res.data;
};
