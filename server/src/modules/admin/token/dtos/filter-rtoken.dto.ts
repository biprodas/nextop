import { IsDateString, IsIP, IsString, IsUUID } from 'class-validator';

export class FilterRefreshTokenDto {
  id?: any;

  userId?: any;

  expiresAt?: any;

  revokedAt?: any;

  createdByIp?: any;

  revokedByIp?: any;

  replacedById?: any;

  isActive?: any;

  isExpired?: any;
}
