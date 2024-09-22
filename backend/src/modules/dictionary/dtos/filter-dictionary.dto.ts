import { IsString } from 'class-validator';

export class FilterDictionaryDto {
  @IsString()
  title: string;
}
