import { IsDefined, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @IsEmail()
  @IsDefined()
  email: string;
}
