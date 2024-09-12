import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { GrantType } from '../enums/grant-type.enum';

// AccessTokenPayload and RefreshTOkenPayload
export class JwtPayload {
  @IsUUID('4')
  jti: string; // refreshTokenId

  @IsUUID('4')
  @IsDefined()
  sub: string; // userId

  // @IsEnum(GrantType)
  // GrantType: GrantType = GrantType.AccessToken;
}
