import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import { IAddCountry, ICountryResponse } from "./dto";

export const useGetCountriesQuery = () => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery<
    ICountryResponse,
    Error
  >({
    queryKey: ["countries"],
    queryFn: async () =>
      (await apiClient.get<ICountryResponse>("/api/v1/countries")).data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};

export const useAddCountryMutation = () => {
  return useMutation({
    mutationKey: ["add-country"],
    mutationFn: async (body: IAddCountry) =>
      (await apiClient.post("/api/v1/countries", body)).data,
    onSuccess: (data) => {
      // Handle success (e.g., refetch queries, reset form, etc.)
      console.log("Country added:", data);
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error creating country:", error);
    },
  });
};

export const useDeleteCountryMutation = () => {
  return useMutation({
    mutationKey: ["delete-country"],
    mutationFn: async (id: number) =>
      (await apiClient.delete(`/api/v1/countries/${id}`)).data,
    onSuccess: (data) => {
      // Handle success (e.g., refetch queries, reset form, etc.)
      console.log("Country deleted:", data);
    },
    onError: (error) => {
      // Handle error (e.g., show notification)
      console.error("Error deleting country:", error);
    },
  });
};
