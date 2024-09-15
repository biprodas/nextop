import { Expose } from 'class-transformer';

export class ProfessorResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
