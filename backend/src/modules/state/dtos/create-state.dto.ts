import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  acronym: string;

  @IsUUID('4')
  @IsDefined()
  countryId: string;
}
