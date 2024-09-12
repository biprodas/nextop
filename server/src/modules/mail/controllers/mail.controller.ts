import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { CreateMailDto } from '../dtos/create-mail.dto';
import { UpdateMailDto } from '../dtos/update-mail.dto';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { SendMailDto } from '../dtos/send-mail.dto';
import { ResetPasswordMailDto } from '../dtos/reset-password-mail.dto';
import { AuthMailService } from '../services/auth-mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly authMailService: AuthMailService,
  ) {}

  @Post('send-test-email')
  async sendTestMail(
    @RequestContext() ctx: RequestContextDto,
    @Body() sendMailDto: SendMailDto,
  ) {
    const data = await this.mailService.sendTestMail(ctx, sendMailDto);

    return {
      success: true,
      statusCode: '200',
      message: `Mail sent to ${sendMailDto.to}`,
      data,
    };
  }

  @Post('/send-user-welcome')
  async sendEmail(@RequestContext() ctx: RequestContextDto) {
    return await this.mailService.sendUserWelcome(ctx, 'confirmation_token');
  }

  @Post('reset-password')
  async resetPassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() resetPasswordMailDto: ResetPasswordMailDto,
  ) {
    console.log(`${ctx.requestId} ${this.resetPassword.name}Controller`);

    const data = await this.authMailService.sendResetPasswordEmail(
      ctx,
      resetPasswordMailDto,
    );

    return {
      success: true,
      statusCode: '200',
      message: `Mail sent to ${resetPasswordMailDto.email}`,
      data,
    };
  }

  // @Post('confirm-email')
  // async sendVerifyEmailMail() {

  //   const confirmMailTemplate = confirmMail
  //     .replace(new RegExp('--PersonName--', 'g'), "Biprodas")
  //     .replace(new RegExp('--ProjectName--', 'g'), "Drivus CRM")
  //     .replace(new RegExp('--ProjectAddress--', 'g'), "Australia")
  //     .replace(new RegExp('--ProjectLogo--', 'g'), "Drivus Logo")
  //     .replace(new RegExp('--ProjectSlogan--', 'g'), "Two mules for sister sara")
  //     .replace(new RegExp('--ProjectColor--', 'g'), "Deep blue, red")
  //     .replace(new RegExp('--ProjectLink--', 'g'), "drivus.com")
  //     .replace(new RegExp('--ButtonLink--', 'g'), "A bottom link")
  //     .replace(new RegExp('--TermsOfServiceLink--', 'g'),"Drivus terms and service");

  //     const mail = {
  //       to: "biprodas.cse@gmail.com",
  //       subject: 'Confirm your email test',
  //       from: 'milon@semicolonit.com', // Fill it with your validated email on SendGrid account
  //       text: 'Please confirm your email by login in you email and view the template',
  //       html: confirmMailTemplate,
  //     };

  //     return await this.sendgridService.sendTestMail(ctx, "biprodas.cse@gmail.com");
  //   }

  @Post()
  create(@Body() createMailDto: CreateMailDto) {
    return this.mailService.create(createMailDto);
  }

  @Get()
  findAll() {
    return this.mailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailDto: UpdateMailDto) {
    return this.mailService.update(+id, updateMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailService.remove(+id);
  }
}
