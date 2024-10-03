import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UniversityType } from '../enums/university-type.enum';
import { Transform } from 'class-transformer';

export class UpdateUniversityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  acronym: string;

  @IsEnum(UniversityType)
  @IsOptional()
  type: UniversityType;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  website: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  ranking: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  details: string;

  @IsUUID('4')
  countryId: string;

  @IsUUID('4')
  @IsOptional()
  stateId: string;
}
