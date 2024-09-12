import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { Environment } from '@common/enums/environment.enum';
import { AuthMailService } from './services/auth-mail.service';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        // transport: 'smtps://user@example.com:topsecret@smtp.example.com',
        transport: {
          host: config.get('MAIL_HOST'),
          port: config.get('MAIL_PORT'),
          secure: false,
          //   ignoreTLS: true,
          //   requireTLS: false,
          auth: {
            user: config.get('MAIL_USERNAME'),
            pass: config.get('MAIL_PASSWORD'),
          },
          debug: true,
        },
        preview: process.env.NODE_ENV === Environment.Development,
        defaults: {
          from: `"${config.get('MAIL_FROM_NAME')}" <${config.get(
            'MAIL_FROM_ADDRESS',
          )}>`,
        },
        template: {
          dir: join(__dirname, 'templates'), // process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
        // options: {
        //   partials: {
        //     dir: join(__dirname, '/templates/partials'),
        //     options: {
        //       strict: true,
        //     },
        //   },
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [MailController],
  providers: [MailService, AuthMailService],
  exports: [MailService, AuthMailService],
})
export class MailModule {}
