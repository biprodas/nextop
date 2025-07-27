export interface ICountry {
  id: string;
  name: string;
  alpha2Code?: string;
  alpha3Code?: string;
  numericCode?: string;
  callingCode?: string;
}

export interface IAddCountry {
  id?: string;
  name?: string;
  alpha2Code?: string;
  alpha3Code?: string;
  numericCode?: string;
  callingCode?: string;
}

export interface IUpdateCountry {
  id: string;
  name?: string;
  alpha2Code?: string;
  alpha3Code?: string;
  numericCode?: string;
  callingCode?: string;
}

export interface ICountryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICountry[];
}
