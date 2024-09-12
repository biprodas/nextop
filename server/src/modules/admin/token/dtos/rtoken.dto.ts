import { ApiProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { UserResponseDto } from '@admin/user/dtos/user-response.dto';
import { UserDto } from '@admin/user/dtos/user.dto';

class PartialUserDto extends PickType(UserDto, ['id', 'isAdmin'] as const) {}

export class RefreshTokenDto {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  userId: string;

  @Expose()
  @ApiProperty({ type: PartialUserDto })
  @Type(() => PartialUserDto)
  user: PartialUserDto;

  @Expose()
  @ApiProperty()
  expiresAt: Date;

  @Expose()
  @ApiProperty()
  revokedAt: Date;

  @Expose()
  @ApiProperty()
  createdByIp: string;

  @Expose()
  @ApiProperty()
  revokedByIp: string;

  @Expose()
  @ApiProperty()
  replacedById: string;

  @Expose()
  @ApiProperty()
  isExpired: boolean;

  @Expose()
  @ApiProperty()
  isActive: boolean;
}
