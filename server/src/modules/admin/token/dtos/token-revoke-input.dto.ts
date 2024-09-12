import { UserDto } from "@admin/user/dtos/user.dto";
import { Type } from "class-transformer";
import { IsEnum, IsJWT, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";
import { RevokeGrant } from "../enums/revoke-grant.enum";
import { TokenRevokeBy } from "../enums/token-revoke-by.dto";


export class TokenRevokeInput {
  @IsEnum(TokenRevokeBy)
  revokeBy: TokenRevokeBy;

  @Type(()=>UserDto)
  user?: UserDto;

  @IsJWT()
  refreshToken?: string;

  @IsEnum(RevokeGrant)
  revokeFor: RevokeGrant;
}