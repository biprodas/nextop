export interface ICategory {
  id: string;
  name: string;
  description?: string;
}

export interface ICreateCategory {
  name: string;
  desription?: string;
}

export interface IUpdateCategory {
  id: string;
  name?: string;
  description?: string;
}

export interface ICategoriesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory[];
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory;
}
