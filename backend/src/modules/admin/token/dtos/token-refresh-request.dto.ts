import { ToBoolean } from '@common/decorators/transforms.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class TokenRefreshRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;

  @ApiProperty()
  @ToBoolean()
  @IsBoolean()
  readonly refreshAll: boolean;
}
