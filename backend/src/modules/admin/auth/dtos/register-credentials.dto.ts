import { UserRole } from '@admin/user/enums/user-role.enum';
import { UserStatus } from '@admin/user/enums/user-status.enum';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterCredentialsDto {
  @IsEmail()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsString()
  @IsDefined()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(UserStatus)
  status: UserStatus = UserStatus.Active;

  @IsEnum(UserRole, { each: true })
  @IsOptional()
  roles: UserRole[];
}
