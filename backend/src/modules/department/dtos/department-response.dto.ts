import { Expose } from 'class-transformer';

export class DepartmentResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  acronym: string;
}
