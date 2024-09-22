import { Expose } from 'class-transformer';

export class StateResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  countryId: number;
}
