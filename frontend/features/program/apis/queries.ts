import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateProgram,
  IProgramResponse,
  IUpdateProgram,
  IProgramsResponse,
} from "./dto";

export const useGetProgramsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IProgramsResponse,
    Error
  >({
    queryKey: ["programs"],
    queryFn: async () =>
      (
        await apiClient.get<IProgramsResponse>("/api/v1/programs", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetProgramQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IProgramResponse,
    Error
  >({
    queryKey: ["program", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IProgramResponse>(`/api/v1/programs/${id}`)).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateProgramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-program"],
    mutationFn: async (body: ICreateProgram) =>
      (await apiClient.post<IProgramResponse>("/api/v1/programs", body)).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      console.log("Program created:", data);
    },
    onError: (error) => {
      console.error("Error creating program:", error);
    },
  });
};

export const useUpdateProgramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-program"],
    mutationFn: async ({ id, ...patch }: IUpdateProgram) =>
      (await apiClient.put<IProgramResponse>(`/api/v1/programs/${id}`, patch))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      console.log("Program updated:", data);
    },
    onError: (error) => {
      console.error("Error updating program:", error);
    },
  });
};

export const useDeleteProgramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-program"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/programs/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      console.log("Program deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting program:", error);
    },
  });
};
