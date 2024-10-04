import { Expose } from 'class-transformer';

export class ProfessorResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  website: string;

  @Expose()
  details: string;

  @Expose()
  universityId: string;

  @Expose()
  departmentId: string;
}
