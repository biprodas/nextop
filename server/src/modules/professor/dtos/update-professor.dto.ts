import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfessorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
