import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import {
  ICreateCategory,
  ICategoryResponse,
  IUpdateCategory,
  ICategoriesResponse,
} from "./dto";

export const useGetCategoriesQuery = (filters?: { name?: string }) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICategoriesResponse,
    Error
  >({
    queryKey: ["category"],
    queryFn: async () =>
      (
        await apiClient.get<ICategoriesResponse>("/api/v1/categories", {
          params: filters,
        })
      ).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useGetCategoryQuery = (id: number | string) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICategoryResponse,
    Error
  >({
    queryKey: ["category", id],
    enabled: !!id,
    queryFn: async () =>
      (await apiClient.get<ICategoryResponse>(`/api/v1/categories/${id}`)).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["add-category"],
    mutationFn: async (body: ICreateCategory) =>
      (await apiClient.post("/api/v1/categories", body)).data,
    onSuccess: (data) => {
      // Handle success (e.g., refetch queries, reset form, etc.)
      queryClient.invalidateQueries({ queryKey: ["category"] });
      console.log("Category added:", data);
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error creating category:", error);
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["update-category"],
    mutationFn: async ({ id, ...patch }: IUpdateCategory) =>
      (await apiClient.put(`/api/v1/categories/${id}`, patch)).data,
    onSuccess: (data) => {
      // Handle success (e.g., refetch queries, reset form, etc.)
      queryClient.invalidateQueries({ queryKey: ["category"] });
      console.log("Category updated:", data);
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error updating category:", error);
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/categories/${id}`))?.data,
    onSuccess: (data) => {
      // Handle success (e.g., refetch queries, reset form, etc.)
      queryClient.invalidateQueries({ queryKey: ["category"] });
      console.log("Category deleted:", data);
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error deleting category:", error);
    },
  });
};

export const useBulkDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (id: string | number) =>
      (await apiClient.delete(`/api/v1/categories/${id}`))?.data,
    onSuccess: (data) => {
      // Handle success (e.g., refetch queries, reset form, etc.)
      queryClient.invalidateQueries({ queryKey: ["category"] });
      console.log("Category deleted:", data);
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error deleting category:", error);
    },
  });
};
