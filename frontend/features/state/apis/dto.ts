export interface IState {
  id: string;
  name: string;
  countryId: string;
}

export interface ICreateState {
  name: string;
  countryId: string;
}

export interface IUpdateState {
  id: string;
  name?: string;
  countryId?: string;
}

export interface IStatesResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IState[];
}

export interface IStateResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IState;
}
