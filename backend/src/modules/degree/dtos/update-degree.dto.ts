import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateDegreeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  acronym: string;
}
