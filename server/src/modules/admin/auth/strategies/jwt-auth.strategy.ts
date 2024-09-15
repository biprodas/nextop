import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import {
  DisabledUserException,
  InvalidCredentialsException,
} from '@common/exceptions';
import { UserStatus } from '@admin/user/enums/user-status.enum';
import { ErrorType } from '@common/enums';
import { UserService } from '@admin/user/services/user.service';
import { AuthStrategy } from '../enums/auth-strategy.enum';
import { AccessTokenPayload } from '@admin/token/dtos/access-token-payload.dto';
import { TokenType } from '@admin/token/enums/token-type.enum';
import { UserDto } from '@admin/user/dtos/user.dto';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.JwtAuth,
) {
  constructor(
    public readonly userService: UserService,
    public readonly configService: ConfigService,
  ) {
    const secretKey = configService.get<string>(
      'auth.jwt.accessToken.secretKey',
    );

    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        JwtAuthStrategy.extractJWT,
      ]),
      ignoreExpiration: false,
      secretOrKey: secretKey,
      // algorithms: ['RS256'],
      // signOptions: {
      //   expiresIn: configService.get('JWT_ACCESS_TOKEN_EXPIRES')
      // },
    });
  }

  // Passport automatically creates a user object, based on the value we return from the validate() method,
  // and assigns it to the Request object as req.user
  async validate(payload: AccessTokenPayload): Promise<UserDto> {
    // console.log("JwtAuthStrategy: Token Payload", payload);

    const { sub: id } = payload;
    // validating payload here
    const user = await this.userService.findUserById(id);
    if (!user) {
      // throw new UnauthorizedException();
      throw new InvalidCredentialsException();
    }
    if (user.status == UserStatus.Inactive) {
      throw new DisabledUserException(ErrorType.InactiveUser);
    }
    if (user.status == UserStatus.Blocked) {
      throw new DisabledUserException(ErrorType.BlockedUser);
    }
    // ignoreExpiration: true kore refreshtoken diye access token generate korte hobe,
    return user; // or only id, usrname, role
  }

  // extract jwt from cookie
  private static extractJWT(req: Request): string | null {
    const accessToken = req.cookies[TokenType.AccessToken];
    const refreshToken = req.cookies[TokenType.RefreshToken];
    // console.log("JwtAuthStrategy: Extract token from cookie");
    return req.cookies[TokenType.AccessToken];
  }
}
