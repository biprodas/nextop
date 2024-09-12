import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  IsObject,
} from 'class-validator';
import { LogGeneratedBy } from '../enums';
import { LogActionType } from '../enums/log-action-type.enum';
import { LogLevel } from '../enums/log-level.enum';
import { RefTable } from '../enums/ref-table.enum';

export class CreateLogDto {
  @IsEnum(LogLevel)
  @IsOptional()
  level: LogLevel;

  @IsEnum(LogActionType)
  @IsDefined()
  actionType: LogActionType;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  code: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  details: string;

  @Transform(({ value }) => value || null)
  @IsObject()
  @IsOptional()
  data: any;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  note: string;

  @IsUUID('4')
  @IsOptional()
  eventId: string;

  @IsUUID('4')
  @IsOptional()
  refId: string;

  @IsEnum(RefTable)
  @IsOptional()
  refTable: RefTable;

  @IsEnum(LogGeneratedBy)
  @IsOptional()
  generatedBy: LogGeneratedBy;

  @IsUUID('4')
  @IsOptional()
  createdById: string;
}
