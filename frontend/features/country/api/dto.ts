export interface ICountry {
  id: string;
  name: string;
  alpha2?: string;
  alpha3?: string;
  isoCode?: string;
  phoneCode?: string;
  // currencyCode?: string;
  // currencyName?: string;
  // capitalCity?: string;
  // flag?: string;
}

export interface IAddCountry {
  id?: string;
  name?: string;
  alpha2?: string;
  alpha3?: string;
  isoCode?: string;
  phoneCode?: string;
}

export interface IUpdateCountry {
  id: string;
  name?: string;
  alpha2?: string;
  alpha3?: string;
  isoCode?: string;
  phoneCode?: string;
}

export interface ICountryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICountry[];
}
