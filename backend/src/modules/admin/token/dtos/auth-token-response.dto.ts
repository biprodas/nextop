import { SecurityScheme } from '@admin/token/enums/auth-sceme.type';
import { TokenType } from '@admin/token/enums/token-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthTokenResponseDto {
  @Expose()
  @ApiProperty()
  type: SecurityScheme;

  @Expose()
  @ApiProperty()
  [TokenType.AccessToken]: string;

  @Expose()
  @ApiProperty()
  [TokenType.RefreshToken]?: string;
}
