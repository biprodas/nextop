import { useQuery } from "@tanstack/react-query";
import apiClient from "~/utils/axios";
import { CountryResponse } from "./dto";

const useGetCountries = () => {
  const { data, error, isLoading, isError } = useQuery<CountryResponse, Error>({
    queryKey: ["countries"],
    queryFn: async () =>
      (await apiClient.get<CountryResponse>("/api/v1/countries")).data,
  });
  return { data, error, isError, isLoading };
};

export default useGetCountries;
