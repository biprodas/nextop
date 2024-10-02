import apiClient from "~/utils/axios";
import { IAddCountry, ICountryResponse } from "./dto";

export const getCountries = async () => {
  const res = await apiClient.get<ICountryResponse>("/api/v1/countries");
  return res.data;
};

const createCountry = async (data: IAddCountry) => {
  const res = await apiClient.post("/api/v1/countries", data);
  return res.data;
};

const deleteCountry = async (countryId: number) => {
  const res = await apiClient.delete(`/api/v1/countries/${countryId}`);
  return res.data;
};
