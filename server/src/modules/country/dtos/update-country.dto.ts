import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  alpha2: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  alpha3: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  code: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  phone: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  capital: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  currencyCode: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  currencyName: string;

  @Transform(({ value }) => value || null)
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsOptional()
  languages: string[];
}
