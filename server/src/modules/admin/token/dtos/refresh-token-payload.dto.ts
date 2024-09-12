import { IsUUID } from 'class-validator';

export class RefreshTokenPayload {
  @IsUUID('4')
  jti: string;

  @IsUUID('4')
  sub: string;
}
