import { IsString } from 'class-validator';

export class FilterWordDto {
  @IsString()
  word: string;
}
