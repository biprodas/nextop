import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProfessorDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
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
