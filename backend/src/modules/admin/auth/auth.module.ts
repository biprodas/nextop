import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { TokenModule } from '@admin/token/token.module';
import { AuthStrategy } from './enums';
import {
  LocalStrategy,
  JwtAuthStrategy,
  JwtRefreshStrategy,
} from './strategies';
import { MailModule } from '@modules/mail/mail.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    MailModule,
    PassportModule.register({
      defaultStrategy: AuthStrategy.JwtAuth,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtAuthStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}
