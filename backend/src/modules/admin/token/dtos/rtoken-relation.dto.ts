import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserDto } from '@admin/user/dtos/user.dto';

export class RefreshTokenRelationDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty({ type: UserDto })
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @ApiProperty()
  expiresAt: Date;

  @Expose()
  @ApiProperty()
  revokedAt: Date;

  @Expose()
  @ApiProperty()
  createdByIp: any;

  @Expose()
  @ApiProperty()
  revokedByIp: any;

  @Expose()
  @ApiProperty()
  replacedByTokenId: string;

  @Expose()
  @ApiProperty()
  isExpired: boolean;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  // @Expose()
  // @ApiProperty({ type: [RefreshTokenResponseDto] })
  // @Type(() => RefreshTokenResponseDto)
  // replacedByToken: RefreshTokenResponseDto;

  // @Expose()
  // @ApiProperty({ type: [RefreshTokenResponseDto] })
  // @Type(() => RefreshTokenResponseDto)
  // replaceTokens: RefreshTokenResponseDto[];
}
