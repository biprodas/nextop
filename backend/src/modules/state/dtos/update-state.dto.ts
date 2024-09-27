import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID('4')
  countryId: string;
}
