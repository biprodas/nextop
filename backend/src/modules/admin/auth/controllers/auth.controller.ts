import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { RegisterCredentialsDto } from '../dtos/register-credentials.dto';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { AuthenticationResponseDto } from '../dtos/authentication-response.dto';
import { Serialize } from '@common/interceptors/serialize.interceptor';
import { TokenType } from '@admin/token/enums/token-type.enum';
import { ConfigService } from '@nestjs/config';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { AuthTokenResponseDto } from '@admin/token/dtos/auth-token-response.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';
import { UpdatePasswordDto } from '@admin/user/dtos/update-password.dto';
import { UpdateUserDto } from '@admin/user/dtos/update-user.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Serialize(AuthenticationResponseDto)
  @Post('/register')
  async register(
    @RequestContext() ctx: RequestContextDto,
    @Body() registerCredentialsDto: RegisterCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<BaseApiSuccessResponse<AuthenticationResponseDto>> {
    const authPayload = await this.authService.register(
      ctx,
      registerCredentialsDto,
    );
    this.buildCookieTokenResponse(ctx, res, authPayload.tokenPayload);

    return {
      success: true,
      statusCode: ``,
      message: `Registration successfull`,
      data: authPayload,
    };
  }

  @Serialize(AuthenticationResponseDto)
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('/login')
  async login(
    @RequestContext() ctx: RequestContextDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    // await this.authService.payAdLogin(ctx);
    const authPayload = await this.authService.buildAuthenticationPayload(
      ctx,
      ctx.user,
    );
    this.buildCookieTokenResponse(ctx, res, authPayload.tokenPayload);

    return {
      success: true,
      statusCode: 200,
      message: `Log in successfull`,
      data: authPayload,
    };
  }

  @Delete('/logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    Object.entries(req.cookies).forEach(([key]) => res.clearCookie(key));

    return {
      success: true,
      statusCode: ``,
      message: `Logout successfull`,
      data: {},
    };
  }

  @Serialize(AuthenticationResponseDto)
  @Post('/signup')
  async signUp(
    @RequestContext() ctx: RequestContextDto,
    @Body() signupDto: RegisterCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<BaseApiSuccessResponse<AuthenticationResponseDto>> {
    const authPayload = await this.authService.singUp(ctx, signupDto);
    this.buildCookieTokenResponse(ctx, res, authPayload.tokenPayload);

    return {
      success: true,
      statusCode: ``,
      message: `Signup successfull`,
      data: authPayload,
    };
  }

  @Serialize(AuthenticationResponseDto)
  @Post('/signin')
  async signIn(
    @RequestContext() ctx: RequestContextDto,
    @Body() signinDto: LoginCredentialsDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const authPayload = await this.authService.singIn(ctx, signinDto);
    this.buildCookieTokenResponse(ctx, res, authPayload.tokenPayload);

    return {
      success: true,
      statusCode: ``,
      message: `Signin successfull`,
      data: authPayload,
    };
  }

  @Delete('/signout')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    // response.cookie('token', 'none', {
    //   expires: new Date(Date.now() + 10 * 1000),
    //   httpOnly: true
    // });

    //revoke token
    Object.entries(req.cookies).forEach(([key]) => res.clearCookie(key));
    // response.cookie('token', '', { expires: new Date() });

    return {
      success: true,
      statusCode: ``,
      message: `Logout successfull`,
      data: {},
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getMe(@RequestContext() ctx: RequestContextDto) {
    const myProfile = await this.authService.getMe(ctx);

    return {
      success: true,
      statusCode: ``,
      message: `Get current user`,
      data: myProfile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async deleteMe(@RequestContext() ctx: RequestContextDto) {
    const myDeletedProfile = await this.authService.deleteMe(ctx);

    return {
      success: true,
      statusCode: ``,
      message: `Delete current user`,
      data: myDeletedProfile,
    };
  }

  // authenticated user can update their own profile
  @UseGuards(JwtAuthGuard)
  @Patch('/update-details')
  async updateDetails(
    @RequestContext() ctx: RequestContextDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const myDetails = await this.authService.updateDetails(ctx, updateUserDto);

    return {
      success: true,
      statusCode: ``,
      message: `My details updated`,
      data: myDetails,
    };
  }

  // authenticated user can change their own password
  @UseGuards(JwtAuthGuard)
  @Patch('/update-password')
  async updatePassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const data = await this.authService.updatePassword(ctx, updatePasswordDto);

    return {
      success: true,
      statusCode: ``,
      message: `Password updated`,
      data: {},
    };
  }

  @Post('/forgot-password')
  async forgotPassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    const mailPayload = await this.authService.forgotPassword(
      ctx,
      forgotPasswordDto,
    );

    return {
      success: true,
      statusCode: ``,
      message: `An email is sent to ${forgotPasswordDto.email} with next instructions on resetting your password`,
      data: mailPayload,
    };
  }

  @Patch('/reset-password')
  async resetMyPassword(
    @RequestContext() ctx: RequestContextDto,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    await this.authService.resetPassword(ctx, resetPasswordDto);

    return {
      success: true,
      statusCode: ``,
      message: `Password reset successfull`,
      data: {},
    };
  }

  @Get('/confirm')
  confirm(
    @RequestContext() ctx: RequestContextDto,
    @Query() confirmAccountQuery,
  ) {
    // this.authService.confirm(confirmAccountQuery); //return boolean

    return {
      success: true,
      statusCode: ``,
      message: `Password reset`,
      data: confirmAccountQuery,
    };
  }

  private buildCookieTokenResponse(
    ctx: RequestContextDto,
    response: Response,
    tokenPayload: AuthTokenResponseDto,
  ) {
    // console.log("jwt access", this.configService.get('JWT_ACCESS_TOKEN_EXPIRES'));

    const accessTokenCookieOptions = {
      expires: new Date(
        Date.now() +
          this.configService.get('auth.jwt.accessToken.expirationTime') * 1000, // cookie expires in in ms
      ),
      // secure: config.SSL && config.NODE_ENV===env_mode.PRODUCTION
    };

    const refreshTokenCookieOptions = {
      // domain: 'localhost',
      expires: new Date(
        Date.now() +
          this.configService.get('auth.jwt.refreshToken.expirationTime') * 1000, // cookie expires in in ms
      ),
      // secure: config.SSL && config.NODE_ENV===env_mode.PRODUCTION
    };

    response
      .status(200)
      .cookie(
        'token',
        tokenPayload[TokenType.AccessToken],
        accessTokenCookieOptions,
      )
      .cookie(TokenType.AccessToken, tokenPayload[TokenType.AccessToken], {
        ...accessTokenCookieOptions,
        httpOnly: true,
      })
      .cookie(TokenType.RefreshToken, tokenPayload[TokenType.RefreshToken], {
        ...refreshTokenCookieOptions,
        httpOnly: true,
      });
  }
}
