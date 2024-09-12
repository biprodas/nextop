import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CustomerMailDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  lastName: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  verifyUrl: string;
}
