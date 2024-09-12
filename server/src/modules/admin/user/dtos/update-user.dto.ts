import { Transform } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsEmail,
  IsOptional,
  IsNotEmpty,
} from 'class-validator';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';
import { UserGender } from '../enums/user-gender.enum';

export class UpdateUserDto {
  @IsEmail()
  type: UserRole;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  photo: string;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsEnum(UserGender)
  @IsOptional()
  gender: UserGender;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  bio: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  address: string;

  @IsEnum(UserRole, { each: true })
  @IsOptional()
  roles: UserRole[];
}
