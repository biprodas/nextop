import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { Priority, TaskStatus } from '../enums';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
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

  // @IsUUID('4')
  // @IsOptional()
  // eventId: string;

  @IsUUID('4')
  @IsOptional()
  assignedById: string;

  @IsUUID('4')
  @IsOptional()
  createdById: string;

  // assignees
  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  usersId: string[];

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;
}
