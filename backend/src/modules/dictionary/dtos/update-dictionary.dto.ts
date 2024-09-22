import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDictionaryDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
