import apiClient from "~/utils/axios";
import { ICreateCategory, ICategoryResponse } from "./dto";

export const getCountries = async () => {
  const res = await apiClient.get<ICategoryResponse>("/api/v1/countries");
  return res.data;
};

const createCategory = async (data: ICreateCategory) => {
  const res = await apiClient.post("/api/v1/countries", data);
  return res.data;
};

const deleteCategory = async (categoryId: number) => {
  const res = await apiClient.delete(`/api/v1/countries/${categoryId}`);
  return res.data;
};
