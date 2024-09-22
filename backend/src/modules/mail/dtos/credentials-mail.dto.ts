import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CredentialsMailDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  password: string;
}
