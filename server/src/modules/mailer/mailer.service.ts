import { Injectable } from '@nestjs/common';
import fs from 'node:fs/promises';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('EMAIL_HOST'),
      port: this.configService.get<number>('EMAIL_PORT'),
      auth: {
        user: this.configService.get<string>('EMAIL_USERNAME'),
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
      debug: this.configService.get<boolean>('EMAIL_DEBUG'),
      logger: false,
      // ignoreTLS: configService.get('mail.ignoreTLS', { infer: true }),
      // secure: configService.get('mail.secure', { infer: true }),
      // requireTLS: configService.get('mail.requireTLS', { infer: true }),
    });

    // const options = {
    //   viewEngine: {
    //     extname: '.hbs', // handlebars extension
    //     layoutsDir: process.cwd() + `${this.configService.get<string>('EMAIL_LAYOUT_DIR')}`, // location of handlebars templates
    //     defaultLayout: `${this.configService.get<string>('EMAIL_DEFAULT_LAYOUT')}`, // name of main template
    //     partialsDir: process.cwd() + `${this.configService.get<string>('EMAIL_PARTIAL_DIR')}`, // location of your subtemplates aka. header, footer etc
    //   },
    //   viewPath: process.cwd() + `${this.configService.get<string>('EMAIL_VIEW_PATH')}`,
    //   extName: '.hbs',
    // };
    // this.transporter.use('compile', hbs(options));
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${this.configService.get('mail.defaultName', {
            infer: true,
          })}" <${this.configService.get('mail.defaultEmail', {
            infer: true,
          })}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
