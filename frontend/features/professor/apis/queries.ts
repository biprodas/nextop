import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateProfessor,
  IProfessorResponse,
  IUpdateProfessor,
  IProfessorsResponse,
} from "./dto";

export const useGetProfessorsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IProfessorsResponse,
    Error
  >({
    queryKey: ["professors"],
    queryFn: async () =>
      (
        await apiClient.get<IProfessorsResponse>("/api/v1/professors", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetProfessorQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IProfessorResponse,
    Error
  >({
    queryKey: ["professor", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IProfessorResponse>(`/api/v1/professors/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateProfessorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-professor"],
    mutationFn: async (body: ICreateProfessor) =>
      (await apiClient.post<IProfessorResponse>("/api/v1/professors", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["professors"] });
      console.log("Professor created:", data);
    },
    onError: (error) => {
      console.error("Error creating professor:", error);
    },
  });
};

export const useUpdateProfessorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-professor"],
    mutationFn: async ({ id, ...patch }: IUpdateProfessor) =>
      (
        await apiClient.put<IProfessorResponse>(
          `/api/v1/professors/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["professors"] });
      console.log("Professor updated:", data);
    },
    onError: (error) => {
      console.error("Error updating professor:", error);
    },
  });
};

export const useDeleteProfessorMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-professor"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/professors/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["professors"] });
      console.log("Professor deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting professor:", error);
    },
  });
};
