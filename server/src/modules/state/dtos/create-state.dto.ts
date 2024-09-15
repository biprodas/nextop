import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsNumber()
  @IsDefined()
  countryId: number;
}
