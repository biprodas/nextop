import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  countryId: string;
}
