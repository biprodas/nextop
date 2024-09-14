import { RequestContextDto } from '@common/dtos/request-context.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ejs from 'ejs';
import { CreateMailDto } from '../dtos/create-mail.dto';
import { SendMailDto } from '../dtos/send-mail.dto';
import { UpdateMailDto } from '../dtos/update-mail.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendTestMail(ctx: RequestContextDto, sendMailDto: SendMailDto) {
    console.log(`${this.sendTestMail.name} Service called`);

    const user = { name: 'Biprodas Roy', url: 'https://example.com' };

    // const attachment = fs
    // .readFileSync(`${__dirname}/../../../../../public/uploads/attachment.pdf`)
    // .toString('base64');

    const { to } = sendMailDto;

    const ejsHtml = ejs.render('<h3>Hello <%= name %></h3>', user);
    // const emailHtml = render(ReactEmailExample(user));

    const mailOptions = {
      to,
      from: `Biprodas R. <bipro10cse@gmail.com>`,
      subject: 'Sending test email',
      text: 'hello email from aws ses',
      html: ejsHtml,
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

  create(createMailDto: CreateMailDto) {
    return 'This action adds a new mail';
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
