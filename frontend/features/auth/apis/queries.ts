import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import { ISignupInput, ISignupResponse } from "./dto";

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async (body: ISignupInput) => {
      const { data } = await apiClient.post<ISignupResponse>("/api/v1/auth/register", body);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["signup"] });
      console.log("Signup successful:", data);
    },
    onError: (error) => {
      console.error("Error signing up:", error);
    },
  });
};