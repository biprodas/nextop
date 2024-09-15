import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateUniversityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  countryId: number;

  @IsNumber()
  @IsOptional()
  stateId: number;
}
