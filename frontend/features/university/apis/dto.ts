export interface IUniversity {
  id: string;
  name: string;
  countryId: string;
  stateId?: string;
}

export interface ICreateUniversity {
  name: string;
  countryId: string;
  stateId?: string;
}

export interface IUpdateUniversity {
  id: string;
  name?: string;
  countryId?: string;
  stateId?: string;
}

export interface IUniversityResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUniversity;
}

export interface IUniversitiesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUniversity[];
}
