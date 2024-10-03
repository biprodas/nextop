import { Expose } from 'class-transformer';
import { UniversityType } from '../enums/university-type.enum';

export class UniversityResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  acronym: string;

  @Expose()
  type: UniversityType;

  @Expose()
  website: string;

  @Expose()
  ranking: string;

  @Expose()
  details: string;

  @Expose()
  countryId: string;

  @Expose()
  stateId: string;
}
