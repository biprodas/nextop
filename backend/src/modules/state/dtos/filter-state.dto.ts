import { IsOptional, IsString } from 'class-validator';

export class FilterStateDto {
  @IsString()
  @IsOptional()
  name: string;
}
