import { RequestContextDto } from '@common/dtos/request-context.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { VerifyEmailDto } from '../dtos/verify-email.dto';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordMailDto } from '../dtos/reset-password-mail.dto';
import { CredentialsMailDto } from '../dtos/credentials-mail.dto';

@Injectable()
export class AuthMailService {
  constructor(
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserWelcome(ctx: RequestContextDto, token: string) {
    const confirmation_url = `http://localhost:3900/auth/confirm?token=${token}`;

    const mailOptions = {
      to: 'biprodas.cse@gmail.com',
      from: `Biprodas R. <bipro10cse@gmail.com>`,
      subject: 'Welcome to NexTop! Confirm your Email',
      text: 'hello email from aws ses',
      template: './welcome', // `.hbs` extension is appended automatically
      context: {
        name: ctx.user?.name || 'Biprodas',
        url: confirmation_url,
      },
    };

    console.log('mailoptions', mailOptions);

    try {
      const transport = await this.mailerService.sendMail(mailOptions);
      return transport;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException(`Mail sending failed`);
    }
  }

  async sendCredentialsEmail(dto: CredentialsMailDto): Promise<boolean> {
    const { name, email, password } = dto;

    // const message= `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    const mailFromName = this.configService.get('MAIL_FROM_NAME');
    const mailFromAddress = this.configService.get('MAIL_FROM_ADDRESS');

    const mailOptions = {
      to: email,
      from: `${mailFromName} <${mailFromAddress}>`,
      subject: `Your Login Credentials`,
      template: './credentials',
      context: {
        name,
        email,
        password,
      },
    };

    try {
      const transport = await this.mailerService.sendMail(mailOptions);
      return transport;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException(`Mail sending failed`);
    }
  }

  async sendResetPasswordEmail(
    ctx: RequestContextDto,
    dto: ResetPasswordMailDto,
  ): Promise<boolean> {
    const { name, email, resetUrl } = dto;

    // const message= `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    const mailFromName = this.configService.get('MAIL_FROM_NAME');
    const mailFromAddress = this.configService.get('MAIL_FROM_ADDRESS');

    const mailOptions = {
      to: email,
      from: `${mailFromName} <${mailFromAddress}>`,
      subject: `Reset Your Password`,
      template: './reset-password',
      context: {
        name: name,
        url: resetUrl,
      },
    };

    try {
      const transport = await this.mailerService.sendMail(mailOptions);
      return transport;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException(`Mail sending failed`);
    }
  }

  async sendVerifyEmail(
    _ctx: RequestContextDto,
    dto: VerifyEmailDto,
  ): Promise<boolean> {
    const { name, email, verifyUrl } = dto;

    const mailFromName = this.configService.get('MAIL_FROM_NAME');
    const mailFromAddress = this.configService.get('MAIL_FROM_ADDRESS');

    const mailOptions = {
      to: email,
      from: `${mailFromName} <${mailFromAddress}>`,
      subject: `Verify Your Email`,
      template: './welcome',
      context: {
        name: name,
        url: verifyUrl,
      },
    };

    console.log('mailOptions', mailOptions);

    try {
      const transport = await this.mailerService.sendMail(mailOptions);
      return transport;
    } catch (error) {
      console.log('Error', error);
      throw new InternalServerErrorException(`Mail sending failed`);
    }
  }
}
