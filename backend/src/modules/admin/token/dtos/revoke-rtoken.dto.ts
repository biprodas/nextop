import {
  IsDate,
  IsDateString,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RevokeRefreshTokenDto {
  @IsDateString()
  revokedAt: Date; // = (new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).toISOString();

  @IsString()
  revokedByIp: string;
}
