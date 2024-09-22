import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { RefTable } from '../enums';
import { LogActionType } from '../enums/log-action-type.enum';

export class FilterLogDto {
  @ApiProperty()
  @IsEnum(LogActionType)
  @IsOptional()
  actionType: LogActionType;

  @ApiProperty()
  @IsOptional()
  refId: string;

  @ApiProperty()
  @IsEnum(RefTable)
  @IsOptional()
  refTable: RefTable;

  @ApiProperty()
  @IsOptional()
  createdById: string;

  @IsDateString()
  fromDate: string;

  @IsDateString()
  toDate: string;

  @IsString()
  note: string;
}
