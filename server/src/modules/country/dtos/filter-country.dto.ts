import { IsOptional, IsString } from 'class-validator';

export class FilterCountryDto {
  @IsString()
  @IsOptional()
  name: string;
}
