import { IsOptional, IsString } from 'class-validator';

export class FilterUniversityDto {
  @IsString()
  @IsOptional()
  name: string;
}
