import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateUniversityDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsUUID('4')
  @IsDefined()
  countryId: string;

  @IsUUID('4')
  @IsOptional()
  stateId: string;
}
