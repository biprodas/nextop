import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateState,
  IStateResponse,
  IUpdateState,
  IStatesResponse,
} from "./dto";

export const useGetStatesQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IStatesResponse,
    Error
  >({
    queryKey: ["states"],
    queryFn: async () =>
      (
        await apiClient.get<IStatesResponse>("/api/v1/states", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetStateQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IStateResponse,
    Error
  >({
    queryKey: ["state", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IStateResponse>(`/api/v1/states/${id}`)).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateStateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-state"],
    mutationFn: async (body: ICreateState) =>
      (await apiClient.post<IStateResponse>("/api/v1/states", body)).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      console.log("State created:", data);
    },
    onError: (error) => {
      console.error("Error creating state:", error);
    },
  });
};

export const useUpdateStateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-state"],
    mutationFn: async ({ id, ...patch }: IUpdateState) =>
      (await apiClient.put<IStateResponse>(`/api/v1/states/${id}`, patch)).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      console.log("State updated:", data);
    },
    onError: (error) => {
      console.error("Error updating state:", error);
    },
  });
};

export const useDeleteStateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-state"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/states/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      console.log("State deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting state:", error);
    },
  });
};
