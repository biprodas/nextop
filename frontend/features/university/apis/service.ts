import apiClient from "~/utils/axios";
import {
  ICreateUniversity,
  IUniversityResponse,
  IUniversitiesResponse,
  IUpdateUniversity,
} from "./dto";

export const getUniversities = async () => {
  const res = await apiClient.get<IUniversitiesResponse>(
    "/api/v1/universities"
  );
  return res.data;
};

export const getUniversity = async (universityId: string) => {
  const res = await apiClient.get<IUniversityResponse>(
    `/api/v1/universities/${universityId}`
  );
  return res.data;
};

const createUniversity = async (data: ICreateUniversity) => {
  const res = await apiClient.post<IUniversityResponse>(
    "/api/v1/universities",
    data
  );
  return res.data;
};

export const updateUniversity = async (
  universityId: string,
  data: IUpdateUniversity
) => {
  const res = await apiClient.put<IUniversityResponse>(
    `/api/v1/universities/${universityId}`,
    data
  );
  return res.data;
};

const deleteUniversity = async (universityId: number) => {
  const res = await apiClient.delete(`/api/v1/universities/${universityId}`);
  return res.data;
};
