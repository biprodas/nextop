import { Strategy } from 'passport-local';
import { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthStrategy } from '../enums';
import { DisabledUserException, InvalidCredentialsException } from '@common/exceptions';
import { UserStatus } from '@admin/user/enums/user-status.enum';
import { ErrorType } from '@common/enums';
import { UserDto } from '@admin/user/dtos/user.dto';
import { plainToClass } from 'class-transformer';
import { createRequestContext } from '@common/utils/request-context';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, AuthStrategy.Local) {
  private logger = new Logger(LocalStrategy.name);

  constructor(private authService: AuthService) {
    // Add option passReqToCallback: true to configure strategy to be request-scoped.
    super({
      usernameField: 'email', // can be email
      passwordField: 'password',
      passReqToCallback: true,
    });
  }

  async validate(request: Request, username: string, password: string): Promise<UserDto> {
    const ctx = createRequestContext(request);
    this.logger.log(`${this.validate.name} was called`);

    const user = await this.authService.validateCredentials(username, password);

    if (!user) {
      throw new InvalidCredentialsException();
      // throw new UnauthorizedException('Invalid login credentials');
    }
    if (user.status == UserStatus.Inactive) {
      throw new DisabledUserException(ErrorType.InactiveUser);
    }
    if (user.status == UserStatus.Blocked) {
      throw new DisabledUserException(ErrorType.BlockedUser);
    }

    return plainToClass(UserDto, user, { excludeExtraneousValues: true });
    // return user;
  }
}
