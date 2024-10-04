export interface IProfessor {
  id: string;
  name: string;
  email: string;
  website?: string;
  details?: string;
  universityId?: string;
  departmentId?: string;
}

export interface ICreateProfessor {
  name: string;
  email: string;
  website?: string;
  details?: string;
  universityId?: string;
  departmentId?: string;
}

export interface IUpdateProfessor {
  id: string;
  name?: string;
  email?: string;
  website?: string;
  details?: string;
  universityId?: string;
  departmentId?: string;
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
