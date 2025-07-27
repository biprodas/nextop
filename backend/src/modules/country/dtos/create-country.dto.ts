import { Transform } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  alpha2Code: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  alpha3Code: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  numericCode: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  callingCode: string;
}
