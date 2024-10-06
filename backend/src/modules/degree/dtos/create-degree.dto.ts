import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDegreeDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsOptional()
  acronym: string;
}
