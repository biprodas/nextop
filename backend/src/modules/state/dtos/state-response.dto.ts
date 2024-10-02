import { Expose } from 'class-transformer';

export class StateResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  acronym: string;

  @Expose()
  countryId: string;
}
