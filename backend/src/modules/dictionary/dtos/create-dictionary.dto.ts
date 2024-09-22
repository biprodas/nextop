import { IsBoolean, IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDictionaryDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsBoolean()
  @IsOptional()
  isPrivate: boolean;

  // forks
}
