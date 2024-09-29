import apiClient from "~/utils/axios";
import {
  ICreateDepartment,
  IDepartmentResponse,
  IDepartmentsResponse,
  IUpdateDepartment,
} from "./dto";

export const getDepartments = async () => {
  const res = await apiClient.get<IDepartmentsResponse>("/api/v1/Departments");
  return res.data;
};

export const getDepartment = async (departmentId: string) => {
  const res = await apiClient.get<IDepartmentResponse>(
    `/api/v1/Departments/${departmentId}`
  );
  return res.data;
};

const createDepartment = async (data: ICreateDepartment) => {
  const res = await apiClient.post<IDepartmentResponse>(
    "/api/v1/Departments",
    data
  );
  return res.data;
};

export const updateDepartment = async (
  departmentId: string,
  data: IUpdateDepartment
) => {
  const res = await apiClient.put<IDepartmentResponse>(
    `/api/v1/Departments/${departmentId}`,
    data
  );
  return res.data;
};

const deleteDepartment = async (departmentId: string) => {
  const res = await apiClient.delete(`/api/v1/Departments/${departmentId}`);
  return res.data;
};
