import { IsString } from 'class-validator';

export class FilterProgramDto {
  @IsString()
  name: string;
}
