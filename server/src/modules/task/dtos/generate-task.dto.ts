import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Priority, TaskStatus } from '../enums';

export class GenerateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  tags: string[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  summary: string;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  targetDate: string;

  @IsEnum(Priority)
  @IsOptional()
  priority: Priority;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  // @IsUUID('4')
  // @IsOptional()
  // eventId: string;
}
