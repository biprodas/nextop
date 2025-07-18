import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
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
  isoCode: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  phoneCode: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  currencyCode: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  currencyName: string;
  
  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  capitalCity: string;

  @Transform(({ value }) => value || null)
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  languages: string[];
}
