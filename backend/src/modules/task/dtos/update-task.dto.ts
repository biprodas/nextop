import { Transform } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Priority, TaskStatus } from '../enums';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  tags: string[];

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

  @IsUUID('4')
  @IsOptional()
  assignedById: string;

  @IsArray()
  @IsUUID('4', { each: true })
  usersId: string[];
}
