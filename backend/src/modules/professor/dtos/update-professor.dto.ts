import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProfessorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  website: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  details: string;

  @Transform(({ value }) => value || null)
  @IsUUID('4')
  @IsOptional()
  universityId: string;

  @Transform(({ value }) => value || null)
  @IsUUID('4')
  @IsOptional()
  departmentId: string;
}
