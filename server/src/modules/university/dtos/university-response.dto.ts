import { Expose } from 'class-transformer';

export class UniversityResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  countryId: number;

  @Expose()
  stateId: number;
}
