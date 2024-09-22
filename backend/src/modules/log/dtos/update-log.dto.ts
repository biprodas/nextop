import { LogActionType } from '@modules/log/enums/log-action-type.enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { LogLevel } from '../enums/log-level.enum';
import { RefTable } from '../enums/ref-table.enum';

export class UpdateLogDto {
  @IsEnum(LogLevel)
  @IsOptional()
  level: LogLevel;

  @IsEnum(LogActionType)
  actionType: LogActionType;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  code: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  details: string;

  // @Transform(({ value }) => value || null)
  // @IsString()
  // @IsOptional()
  // notes: string;

  // @IsEnum(LogGeneratedBy)
  // @IsOptional()
  // generatedBy: LogGeneratedBy;

  @IsUUID('4')
  @IsOptional()
  refId: string;

  @IsEnum(RefTable)
  @IsOptional()
  refTable: RefTable;
}
