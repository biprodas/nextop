import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { DisabledUserException, InvalidCredentialsException } from '@common/exceptions';
import { UserStatus } from '@admin/user/enums/user-status.enum';
import { ErrorType } from '@common/enums';
import { UserService } from '@admin/user/services/user.service';
import { AuthStrategy } from '../enums/auth-strategy.enum';
import { UserRefreshTokenClaims } from '../../token/dtos/auth-token-claims.dto';
import { UserDto } from '@admin/user/dtos/user.dto';
import { TokenType } from '@admin/token/enums/token-type.enum';

// get tokenid/userid from payload and find token and user
// check accessToken, if valid return user
// checek refreshToken if valid, create refresh and access token, and return user
// return return null

// not used yet
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, AuthStrategy.JwtRefresh) {
  constructor(
    public readonly userService: UserService,
    public readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromBodyField(TokenType.RefreshToken),
        JwtRefreshStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
      // signOptions: {
      //   expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES')
      // },
    });
  }

  // Passport automatically creates a user object, based on the value we return from the validate() method,
  // and assigns it to the Request object as req.user
  async validate(payload: any): Promise<UserDto> {
    // console.log("JwtRefreshStrategy: Token Payload", payload);
    const { sub: id } = payload;
    return { id } as UserDto;
  }

  // extract jwt from cookie
  private static extractJWT(req: Request): string | null {
    const accessToken = req.cookies[TokenType.AccessToken];
    const refreshToken = req.cookies[TokenType.RefreshToken];
    // console.log("JwtRefreshStrategy: Extract token from cookie");
    return req.cookies[TokenType.RefreshToken];
  }
}
