import { IsString } from 'class-validator';

export class FilterDepartmentDto {
  @IsString()
  name: string;
}
