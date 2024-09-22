import { IsDefined, IsEmail, IsString } from 'class-validator';

export class SendMailDto {
  // @IsEmail()
  // @IsDefined()
  // from: string;

  @IsEmail()
  @IsDefined()
  to: string; // list of emails

  @IsEmail()
  cc: string; // list of emails

  @IsEmail()
  bcc: string; // list of emails

  @IsString()
  subject: string;

  @IsString()
  content: string;

  @IsString()
  attachment: string;
}
