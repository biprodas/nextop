export interface ICountry {
  id: string;
  name: string;
  alpha2?: string;
  alpha3?: string;
  code?: string;
  phone?: string;
  capital?: string;
  flag?: string;
}

export interface IAddCountry {
  id?: number;
  name?: string;
  alpha2?: string;
  alpha3?: string;
  code?: string;
  phone?: string;
  capital?: string;
  flag?: string;
}

export interface IUpdateCountry {
  id: number;
  name?: string;
  alpha2?: string;
  alpha3?: string;
  code?: string;
  phone?: string;
  capital?: string;
  flag?: string;
}

export interface ICountryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICountry[];
}
