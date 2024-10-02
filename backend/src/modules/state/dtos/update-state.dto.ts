import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  acronym: string;

  @IsUUID('4')
  countryId: string;
}
