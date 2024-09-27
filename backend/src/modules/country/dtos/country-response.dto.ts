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
  code: string;

  @Expose()
  phone: string;

  @Expose()
  capital: string;

  @Expose()
  currencyCode: string;

  @Expose()
  currencyName: string;

  @Expose()
  languages: string[];
}
