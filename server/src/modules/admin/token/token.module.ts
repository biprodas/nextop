import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { TokenService } from './services/token.service';
import { TokenController } from './controllers/token.controller';
import { TokenEntity } from './entities/token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenEntity]),
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        // publicKey: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        // privateKey: configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
        // if you want to use token with expiration date
        signOptions: {
          // algorithm: 'RS256',
          expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES'),
        },
      }),
    }),
  ],
  providers: [TokenService],
  controllers: [TokenController],
  exports: [JwtModule, TokenService],
})
export class TokenModule {}
