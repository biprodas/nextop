import apiClient from "~/utils/axios";
import { CountryResponse } from "./dto";

export const getCountries = async () => {
  const res = await apiClient.get<CountryResponse>("/api/v1/countries");
  return res.data;
};
