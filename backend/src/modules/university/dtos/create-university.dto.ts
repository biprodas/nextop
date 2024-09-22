import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsNumber()
  @IsDefined()
  countryId: number;

  @IsNumber()
  @IsOptional()
  stateId: number;
}
