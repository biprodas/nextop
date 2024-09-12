import {
  IsBoolean,
  IsDateString,
  IsDefined,
  IsEnum,
  IsIP,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { RevokeGrant } from '../enums/revoke-grant.enum';
import { TokenType } from '../enums/token-type.enum';

export class CreateRefreshTokenDto {
  @IsEnum(TokenType)
  type: TokenType = TokenType.RefreshToken;

  @IsDateString()
  expiresAt: string = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000,
  ).toISOString(); // 7 day

  @IsUUID('4')
  @IsOptional()
  userId: string; // ctx theke nibe

  @IsIP()
  @IsOptional()
  createdByIp: string; // ctx theke nibe

  // @IsEnum(RevokeGrant)
  // revoke: RevokeGrant;
}
