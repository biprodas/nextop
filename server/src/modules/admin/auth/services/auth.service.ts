import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SecurityScheme } from '@admin/token/enums/auth-sceme.type';
import { RevokeGrant } from '@admin/token/enums/revoke-grant.enum';
import { TokenRevokeBy } from '@admin/token/enums/token-revoke-by.dto';
import { TokenType } from '@admin/token/enums/token-type.enum';
import { TokenService } from '@admin/token/services/token.service';
import { CreateUserDto } from '@admin/user/dtos/create-user.dto';
import { UpdatePasswordDto } from '@admin/user/dtos/update-password.dto';
import { UpdateUserDto } from '@admin/user/dtos/update-user.dto';
import { UserDto } from '@admin/user/dtos/user.dto';
import { UserEntity } from '@admin/user/entities/user.entity';
import { UserService } from '@admin/user/services/user.service';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import { AuthMailService } from '@modules/mail/services/auth-mail.service';
import { AuthenticationResponseDto } from '../dtos/authentication-response.dto';
import { ForgotPasswordDto } from '../dtos/forgot-password.dto';
import { LoginCredentialsDto } from '../dtos/login-credentials.dto';
import { RegisterCredentialsDto } from '../dtos/register-credentials.dto';
import { ResetPasswordDto } from '../dtos/reset-password.dto';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly authMailService: AuthMailService,
  ) {}

  async register(
    ctx: RequestContextDto,
    authCredentialsDto: RegisterCredentialsDto,
  ): Promise<AuthenticationResponseDto> {
    const user: UserDto = await this.userService.createUser(
      authCredentialsDto as CreateUserDto,
    );

    return this.buildAuthenticationPayload(ctx, user);
  }

  async singUp(
    ctx: RequestContextDto,
    signupDto: RegisterCredentialsDto,
  ): Promise<AuthenticationResponseDto> {
    const { email, password } = signupDto;

    const user: UserDto = await this.userService.createUser({
      email,
      password,
    } as CreateUserDto);

    return this.buildAuthenticationPayload(ctx, user);
  }

  async singIn(
    ctx: RequestContextDto,
    signinDto: LoginCredentialsDto,
  ): Promise<AuthenticationResponseDto> {
    const { email, password } = signinDto;
    const user = await this.userService.findUserByEmail(email);

    const valid = user
      ? await this.userService.validateUser(user, password)
      : false;

    if (!valid) {
      throw new UnauthorizedException('Invalid login credentials');
    }

    return this.buildAuthenticationPayload(ctx, user);
  }

  async getMe(ctx: RequestContextDto): Promise<UserEntity> {
    console.log(`${this.getMe.name}Service`);

    if (!ctx.user) {
      throw new UnauthorizedException();
    }

    return this.userService.getUser(ctx.user.id);
  }

  async deleteMe(ctx: RequestContextDto): Promise<UserEntity> {
    console.log(`${this.deleteMe.name}Service`);

    if (!ctx.user) {
      throw new UnauthorizedException();
    }

    return this.userService.deleteUser(ctx.user.id);
  }

  async updateDetails(
    ctx: RequestContextDto,
    updateUserDto: UpdateUserDto,
  ): Promise<any> {
    console.log(`${this.updateDetails.name}Service`);

    if (!ctx.user) {
      throw new UnauthorizedException();
    }

    return this.userService.updateUser(ctx.user.id, updateUserDto);
  }

  async updatePassword(
    ctx: RequestContextDto,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<any> {
    console.log(`${this.updatePassword.name}Service`);

    if (!ctx.user) {
      throw new UnauthorizedException();
    }

    return this.userService.updatePassword(ctx.user.id, updatePasswordDto);
  }

  async forgotPassword(
    ctx: RequestContextDto,
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<boolean> {
    const { email } = forgotPasswordDto;
    // find user by email
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User of email ${email} not found`);
    }
    // generate resetPasswordDToken
    const resetToken = await this.tokenService.generateResetPasswordToken(
      ctx,
      user,
    );
    // prepare payload for mail
    const resetPasswordMailDto = {
      email: user.email,
      name: user.username,
      // resetUrl: `${ctx.protocol}://${ctx.host}/reset-password/${resetToken}`
      resetUrl: `${process.env.RESET_PASSWORD_URL}/${resetToken}`,
    };
    // send mail with reset url to the provided email
    return this.authMailService.sendResetPasswordEmail(
      ctx,
      resetPasswordMailDto,
    );
  }

  async resetPassword(
    ctx: RequestContextDto,
    resetPasswordDto: ResetPasswordDto,
  ): Promise<any> {
    console.log(`${this.resetPassword.name} Service`);

    const { resetPasswordToken, newPassword } = resetPasswordDto;
    const { user, rtoken } = await this.tokenService.resolveResetPasswordToken(
      ctx,
      resetPasswordToken,
    );
    // validate and get user and token info from resetPasswordToken
    // update userPassword
    await this.userService.resetPassword(user.id, newPassword);
    // revoke token
    const tokenRevokeInput = {
      revokeBy: TokenRevokeBy.RefreshToken,
      refreshToken: resetPasswordToken,
      revokeFor: RevokeGrant.All,
    };
    await this.tokenService.revokeResetPasswordToken(ctx, tokenRevokeInput);

    return user;
  }

  async confirm(): Promise<any> {
    return null;
  }

  async validateCredentials(email: string, password: string): Promise<any> {
    // console.log(`${this.validateCredentials.name} Service`);

    const user = await this.userService.findUserByEmail(email);

    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async buildAuthenticationPayload(
    ctx: RequestContextDto,
    user: UserDto,
  ): Promise<AuthenticationResponseDto> {
    console.log(`${this.buildAuthenticationPayload.name}Service`);
    const start = process.hrtime();

    const accessToken = await this.tokenService.generateAccessToken(ctx, user);
    const refreshToken = await this.tokenService.generateRefreshToken(
      ctx,
      user,
    );

    const tokenPayload = {
      type: SecurityScheme.Bearer,
      [TokenType.AccessToken]: accessToken,
      ...(refreshToken ? { [TokenType.RefreshToken]: refreshToken } : {}),
    };

    const stop = process.hrtime(start);
    this.logger.log(`Login ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

    return {
      user,
      token: accessToken,
      tokenPayload,
    };
  }

  // async getPayAdvToken(_ctx: RequestContextDto) {
  //   const start = process.hrtime();

  //   // Check if token exists and valid, return the token
  //   const paToken = await this.cacheManager.get('PA_ACCESS_TOKEN');
  //   if (paToken) return paToken;

  //   const apiUrl = this.configService.get('PA_API_URL');

  //   const payAdCredentials = {
  //     username: this.configService.get('PA_USERNAME'),
  //     password: this.configService.get('PA_PASSWORD'),
  //   };

  //   const {
  //     data: { access_token, expires_in },
  //   } = await axios.post(`${apiUrl}/token`, payAdCredentials);

  //   await this.cacheManager.set('PA_ACCESS_TOKEN', access_token, { ttl: expires_in - 10 });

  //   const stop = process.hrtime(start);
  //   this.logger.log(`Pay Advantage Login took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

  //   return access_token;
  // }
}
