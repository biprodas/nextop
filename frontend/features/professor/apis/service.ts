import apiClient from "~/utils/axios";
import {
  ICreateProfessor,
  IProfessorResponse,
  IProfessorsResponse,
  IUpdateProfessor,
} from "./dto";

export const getProfessors = async () => {
  const res = await apiClient.get<IProfessorsResponse>("/api/v1/professors");
  return res.data;
};

export const getProfessor = async (professorId: string) => {
  const res = await apiClient.get<IProfessorResponse>(
    `/api/v1/professors/${professorId}`
  );
  return res.data;
};

const createProfessor = async (data: ICreateProfessor) => {
  const res = await apiClient.post<IProfessorResponse>(
    "/api/v1/professors",
    data
  );
  return res.data;
};

export const updateProfessor = async (
  professorId: string,
  data: IUpdateProfessor
) => {
  const res = await apiClient.put<IProfessorResponse>(
    `/api/v1/professors/${professorId}`,
    data
  );
  return res.data;
};

const deleteProfessor = async (professorId: number) => {
  const res = await apiClient.delete(`/api/v1/professors/${professorId}`);
  return res.data;
};
