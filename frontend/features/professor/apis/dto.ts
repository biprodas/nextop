export interface IProfessor {
  id: string;
  name: string;
  email: string;
}

export interface ICreateProfessor {
  name: string;
  email: string;
}

export interface IUpdateProfessor {
  id: string;
  name?: string;
  email?: string;
}

export interface IProfessorsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProfessor[];
}

export interface IProfessorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProfessor;
}
