import { UserDto } from '@admin/user/dtos/user.dto';
import { Type } from 'class-transformer';
import { IsEnum, IsJWT } from 'class-validator';
import { TokenGenerateBy } from '../enums/token-generate-by.enum';
import { RevokeGrant } from '../enums/revoke-grant.enum';

export class GetAuthTokenInput {
  @IsEnum(TokenGenerateBy)
  generateBy: TokenGenerateBy;

  @Type(() => UserDto)
  user?: UserDto;

  @IsJWT()
  refreshToken?: string;

  @IsEnum(RevokeGrant)
  revokeFor: RevokeGrant; // default no revoke action korte hobe
}
