import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '@admin/user/dtos/user-response.dto';

// move to rtoken-dto
export class RefreshTokenResponseDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

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
  replacedById: string;

  @Expose()
  @ApiProperty()
  isExpired: boolean;

  @Expose()
  @ApiProperty()
  isActive: boolean;

  @Expose()
  @ApiProperty({ type: [UserResponseDto] })
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  // @Expose()
  // @ApiProperty({ type: [RefreshTokenResponseDto] })
  // @Type(() => RefreshTokenResponseDto)
  // replacedByToken: RefreshTokenResponseDto;

  // @Expose()
  // @ApiProperty({ type: [RefreshTokenResponseDto] })
  // @Type(() => RefreshTokenResponseDto)
  // replaceTokens: RefreshTokenResponseDto[];
}
