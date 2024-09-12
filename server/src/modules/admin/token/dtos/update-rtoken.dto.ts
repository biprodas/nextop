import { IsDateString, IsIP, IsOptional, IsUUID } from "class-validator";

export class UpdateRefreshTokenDto {
  @IsDateString()
  @IsOptional()
  revokedAt: string;

  @IsUUID('4')
  @IsOptional()
  replacedById: string; // rtoken_id

  @IsIP()
  @IsOptional()
  revokedByIp: string;  // ctx theke nibe

}