import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StorageType } from '../enums/storage-type.enum';

export class CreateFileDto {
  @IsEnum(StorageType)
  @IsDefined()
  storageType: StorageType;

  @IsString()
  @IsDefined()
  publicKey: string;

  @IsString()
  @IsDefined()
  privateKey: string;

  @IsString()
  @IsOptional()
  fieldname: string;

  @IsString()
  @IsOptional()
  originalname: string;

  @IsString()
  @IsOptional()
  encoding: string;

  @IsString()
  @IsOptional()
  mimetype: string;

  @IsString()
  @IsOptional()
  destination: string;

  @IsString()
  @IsOptional()
  filename: string;

  @IsString()
  @IsOptional()
  path: string;

  @IsNumber()
  @IsOptional()
  size: number;
}
