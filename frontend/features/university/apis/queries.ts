import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateUniversity,
  IUniversityResponse,
  IUpdateUniversity,
  IUniversitiesResponse,
} from "./dto";

export const useGetUniversitiesQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IUniversitiesResponse,
    Error
  >({
    queryKey: ["universities"],
    queryFn: async () =>
      (
        await apiClient.get<IUniversitiesResponse>("/api/v1/universities", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetUniversityQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IUniversityResponse,
    Error
  >({
    queryKey: ["university", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IUniversityResponse>(`/api/v1/universities/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateUniversityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-university"],
    mutationFn: async (body: ICreateUniversity) =>
      (await apiClient.post<IUniversityResponse>("/api/v1/universities", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      console.log("University created:", data);
    },
    onError: (error) => {
      console.error("Error creating university:", error);
    },
  });
};

export const useUpdateUniversityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-university"],
    mutationFn: async ({ id, ...patch }: IUpdateUniversity) =>
      (
        await apiClient.put<IUniversityResponse>(
          `/api/v1/universities/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      console.log("University updated:", data);
    },
    onError: (error) => {
      console.error("Error updating university:", error);
    },
  });
};

export const useDeleteUniversityMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-university"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/universities/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["universities"] });
      console.log("University deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting university:", error);
    },
  });
};
