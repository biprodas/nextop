import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUniversityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  countryId: string;

  @IsUUID('4')
  @IsOptional()
  stateId: string;
}
