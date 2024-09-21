export interface ICountry {
  id: string;
  name: string;
  alpha2: string;
  alpha3: string;
  code: string;
  phone: string;
  capital: string;
  flag: string;
}

export interface CountryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICountry[];
}
