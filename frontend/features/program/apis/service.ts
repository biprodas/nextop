import apiClient from "~/utils/axios";
import {
  ICreateProgram,
  IProgramResponse,
  IProgramsResponse,
  IUpdateProgram,
} from "./dto";

export const getPrograms = async () => {
  const res = await apiClient.get<IProgramsResponse>("/api/v1/programs");
  return res.data;
};

export const getProgram = async (programId: string) => {
  const res = await apiClient.get<IProgramResponse>(
    `/api/v1/programs/${programId}`
  );
  return res.data;
};

const createProgram = async (data: ICreateProgram) => {
  const res = await apiClient.post<IProgramResponse>("/api/v1/programs", data);
  return res.data;
};

export const updateProgram = async (
  programId: string,
  data: IUpdateProgram
) => {
  const res = await apiClient.put<IProgramResponse>(
    `/api/v1/programs/${programId}`,
    data
  );
  return res.data;
};

const deleteProgram = async (programId: number) => {
  const res = await apiClient.delete(`/api/v1/programs/${programId}`);
  return res.data;
};
