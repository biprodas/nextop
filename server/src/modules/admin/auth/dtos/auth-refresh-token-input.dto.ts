import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
