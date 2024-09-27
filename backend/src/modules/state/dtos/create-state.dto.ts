import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsUUID('4')
  @IsDefined()
  countryId: string;
}
