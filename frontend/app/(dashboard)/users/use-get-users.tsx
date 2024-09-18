import { useQuery } from "@tanstack/react-query";
import { IUser } from "~/types";
import apiClient from "~/utils/axios";

interface UserResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUser[];
}

const getUsers = async () => {
  try {
    const res = await apiClient.get<UserResponse>("/api/v1/users");
    return res.data;
  } catch (error: any) {
    console.log("handle error", error);
    throw new Error(error.message);
  }
};

const useGetUsers = () => {
  const { data, error, isLoading, isError } = useQuery<UserResponse, Error>({
    queryKey: ["users"],
    // queryFn: getUsers,
    queryFn: async () =>
      (await apiClient.get<UserResponse>("/api/v1/users")).data,
  });
  return { data, error, isError, isLoading };
};

export default useGetUsers;
