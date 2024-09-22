import { IsDateString, IsEnum } from 'class-validator';
import { StorageType } from '../enums/storage-type.enum';

export class FilterFileDto {
  @IsEnum(StorageType)
  storageType: StorageType;

  @IsDateString()
  cutoffDate: Date;
}
