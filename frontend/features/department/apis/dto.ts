export interface IDepartment {
  id: string;
  name: string;
  acronym?: string;
}

export interface ICreateDepartment {
  name: string;
  acronym?: string;
}

export interface IUpdateDepartment {
  id: string;
  name?: string;
  acronym?: string;
}

export interface IDepartmentsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDepartment[];
}

export interface IDepartmentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IDepartment;
}
