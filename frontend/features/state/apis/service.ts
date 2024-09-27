import apiClient from "~/utils/axios";
import {
  ICreateState,
  IStateResponse,
  IStatesResponse,
  IUpdateState,
} from "./dto";

export const getStates = async () => {
  const res = await apiClient.get<IStatesResponse>("/api/v1/states");
  return res.data;
};

export const getState = async (stateId: string) => {
  const res = await apiClient.get<IStateResponse>(`/api/v1/states/${stateId}`);
  return res.data;
};

const createState = async (data: ICreateState) => {
  const res = await apiClient.post<IStateResponse>("/api/v1/states", data);
  return res.data;
};

export const updateState = async (stateId: string, data: IUpdateState) => {
  const res = await apiClient.put<IStateResponse>(
    `/api/v1/states/${stateId}`,
    data
  );
  return res.data;
};

const deleteState = async (stateId: number) => {
  const res = await apiClient.delete(`/api/v1/states/${stateId}`);
  return res.data;
};
