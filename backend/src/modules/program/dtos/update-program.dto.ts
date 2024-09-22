import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProgramDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
