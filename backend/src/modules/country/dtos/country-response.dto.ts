import { Expose } from 'class-transformer';

export class CountryResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  alpha2Code: string;

  @Expose()
  alpha3Code: string;

  @Expose()
  numericCode: string;

  @Expose()
  callingCode: string;
}
