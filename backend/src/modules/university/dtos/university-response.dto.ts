import { Expose } from 'class-transformer';

export class UniversityResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  countryId: string;

  @Expose()
  stateId: string;
}
