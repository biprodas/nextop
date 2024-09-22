import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from '../user/user.module';
import { TokenController } from './controllers/token.controller';
import { TokenEntity } from './entities/token.entity';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('auth.jwt.accessToken.secretKey'),
        // publicKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET_KEY'),
        // privateKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET_KEY'),
        // if you want to use token with expiration date
        signOptions: {
          // algorithm: 'RS256',
          expiresIn: configService.get<string>(
            'auth.jwt.accessToken.expirationTime',
          ),
        },
      }),
    }),
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [JwtModule, TokenService],
})
export class TokenModule {}
