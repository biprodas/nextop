import { Expose } from 'class-transformer';

export class CountryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  alpha2: string;

  @Expose()
  alpha3: string;

  @Expose()
  isoCode: string;

  @Expose()
  phoneCode: string;

  @Expose()
  currencyCode: string;

  @Expose()
  currencyName: string;

  @Expose()
  capitalCity: string;
  
  @Expose()
  languages: string[];
}
