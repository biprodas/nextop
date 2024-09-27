export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

export interface IAddCategory {
  name: string;
  desription?: string;
}

export interface IUpdateCategory {
  id: number;
  name?: string;
  description?: string;
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory[];
}
