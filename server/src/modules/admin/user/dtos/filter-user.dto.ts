import { IsEnum, IsString } from 'class-validator';
import { UserStatus } from '../enums/user-status.enum';

export class FilterUserDto {
  @IsString()
  email: string;

  @IsEnum(UserStatus)
  status?: UserStatus;
}
