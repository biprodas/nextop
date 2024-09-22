import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @MinLength(8)
  @MaxLength(32)
  password: string;
}
