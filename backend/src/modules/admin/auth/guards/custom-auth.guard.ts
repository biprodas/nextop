import { TokenType } from '@admin/token/enums/token-type.enum';
import { TokenService } from '@admin/token/services/token.service';
import { createRequestContext } from '@common/utils/request-context';
import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AuthStrategy } from '../enums/auth-strategy.enum';

@Injectable()
export class CustomAuthGuard extends AuthGuard(AuthStrategy.JwtAuth) {
  private logger = new Logger(CustomAuthGuard.name);

  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Custom auth guard called');
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const ctx = createRequestContext(request);

    try {
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   ExtractJwt.fromAuthHeaderAsBearerToken(),
      //   CustomAuthGuard.cookieExtractor,
      // ])(request);
      // const accessToken = ExtractJwt.fromExtractors([cookieExtractor])(request);
      const accessToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
      if (!accessToken) {
        throw new UnauthorizedException('Access token is not set');
        // throw new InvalidTokenException();
      }

      // const payload = this.tokenService.verifyToken(accessToken, TokenType.AccessToken);
      // if (!payload) {
      //     throw new UnauthorizedException();
      // }

      const aToken = this.tokenService.decodeAccessToken(ctx, accessToken);
      if (aToken) {
        return this.activate(context);
      }

      const refreshToken = request.cookies[TokenType.RefreshToken];

      if (!refreshToken) {
        throw new UnauthorizedException('Refresh token is not set');
      }

      const rToken = this.tokenService.decodeRefreshToken(ctx, refreshToken);
      if (!rToken) {
        throw new UnauthorizedException('Refresh token is not valid');
      }

      const newAccessToken =
        await this.tokenService.createAccessTokenFromRefreshToken(
          ctx,
          refreshToken,
        );
      // await this.userService.updateRefreshToken(user.id, newRefreshToken);

      request.cookies[TokenType.AccessToken] = newAccessToken;
      // request.cookies[TokenType.RefreshToken] = newRefreshToken;

      const cookieOptions = {
        domain: 'localhost',
        expires: new Date(
          Date.now() +
            +this.configService.get('JWT_ACCESS_TOKEN_EXPIRES') * 1000, // cookie expires in in ms
        ),
      };

      response.cookie(TokenType.AccessToken, newAccessToken, cookieOptions);
      // response.cookie(TokenType.RefreshToken, newRefreshToken, COOKIE_OPTIONS);

      return this.activate(context);
    } catch (err) {
      console.log('Error in custom auth guard');

      // TODO: error handler a handle korte hobe
      this.logger.error(err.message);
      response.clearCookie(TokenType.AccessToken);
      // response.clearCookie(TokenType.RefreshToken, COOKIE_OPTIONS);
      return false;
    }
  }

  async activate(context: ExecutionContext): Promise<boolean> {
    return super.canActivate(context) as Promise<boolean>;
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // private static cookieExtractor(req: Request): string | null {
  //   const accessToken = req.cookies[TokenType.AccessToken];
  //   const refreshToken = req.cookies[TokenType.RefreshToken];
  //   console.log("Extract token from cookie");
  //   return req.cookies[TokenType.AccessToken];
  // }
}
