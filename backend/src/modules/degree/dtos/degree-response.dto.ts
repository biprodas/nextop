import { Expose } from 'class-transformer';

export class DegreeResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  acronym: string;
}
