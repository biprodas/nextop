import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, Matches, Length } from 'class-validator';

const passwordRegex = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export class UpdatePasswordDto {
  @ApiProperty({ example: '123456' })
  @IsNotEmpty()
  @IsAlphanumeric()
  currentPassword: string;

  @ApiProperty({ example: '1234567' })
  // @Matches(passwordRegex, { message: 'Password too weak' })
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(6, 20)
  newPassword: string;
}
