import { AuthTokenResponseDto } from '@admin/token/dtos/auth-token-response.dto';
import { UserDto } from '@admin/user/dtos/user.dto';
import { UserEntity } from '@admin/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AuthenticationResponseDto {
  @Expose()
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @ApiProperty({ type: AuthTokenResponseDto })
  @Type(() => AuthTokenResponseDto)
  tokenPayload: AuthTokenResponseDto;
}

export class AuthenticationPayload {
  user: UserEntity;
  payload: {
    type: string;
    access_token: string;
    refresh_token?: string;
  };
}
