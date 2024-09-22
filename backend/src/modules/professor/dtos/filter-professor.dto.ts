import { IsString } from 'class-validator';

export class FilterProfessorDto {
  @IsString()
  name: string;

  @IsString()
  email: string;
}
