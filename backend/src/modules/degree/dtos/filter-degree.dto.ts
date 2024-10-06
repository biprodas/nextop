import { IsString } from 'class-validator';

export class FilterDegreeDto {
  @IsString()
  name: string;
}
