import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateDepartment,
  IDepartmentResponse,
  IUpdateDepartment,
  IDepartmentsResponse,
} from "./dto";

export const useGetDepartmentsQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IDepartmentsResponse,
    Error
  >({
    queryKey: ["departments"],
    queryFn: async () =>
      (
        await apiClient.get<IDepartmentsResponse>("/api/v1/departments", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetDepartmentQuery = (id: string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    IDepartmentResponse,
    Error
  >({
    queryKey: ["department", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<IDepartmentResponse>(`/api/v1/departments/${id}`))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-department"],
    mutationFn: async (body: ICreateDepartment) =>
      (await apiClient.post<IDepartmentResponse>("/api/v1/departments", body))
        .data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      console.log("Department created:", data);
    },
    onError: (error) => {
      console.error("Error creating department:", error);
    },
  });
};

export const useUpdateDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-department"],
    mutationFn: async ({ id, ...patch }: IUpdateDepartment) =>
      (
        await apiClient.put<IDepartmentResponse>(
          `/api/v1/departments/${id}`,
          patch
        )
      ).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      console.log("Department updated:", data);
    },
    onError: (error) => {
      console.error("Error updating department:", error);
    },
  });
};

export const useDeleteDepartmentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-department"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/departments/${id}`))?.data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      console.log("Department deleted:", data);
    },
    onError: (error) => {
      console.error("Error deleting department:", error);
    },
  });
};
