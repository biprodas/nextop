import { useQuery } from "@tanstack/react-query";
import { ICategoryResponse } from "~/apis/category/dto";
import apiClient from "~/utils/axios";

export const useGetCategories = () => {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await apiClient.get<ICategoryResponse>("/api/v1/countries");
      // if (!res.ok) {
      //   throw new Error("Failed to fetch categories");
      // }
      return res.data;
    },
  });

  return query;
};
