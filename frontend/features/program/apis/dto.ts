export interface IProgram {
  id: string;
  name: string;
  note?: string;
}

export interface ICreateProgram {
  name: string;
  note?: string;
}

export interface IUpdateProgram {
  id: string;
  name?: string;
  note?: string;
}

export interface IProgramsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProgram[];
}

export interface IProgramResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IProgram;
}
