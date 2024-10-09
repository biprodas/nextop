import {
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { DegreeEnum } from '../enums/degree.enum';
import { SubjectEnum } from '../enums/subject.enum';
import { Transform } from 'class-transformer';
import { PriorityEnum } from '../enums/priority.enum';
import { SessionEnum } from '../enums/session.enum';

export class CreateProgramDto {
  // @IsString()
  // @IsNotEmpty()
  // @IsDefined()
  // name: string;

  @IsEnum(DegreeEnum)
  @IsDefined()
  degree: DegreeEnum;

  @IsEnum(SubjectEnum)
  @IsDefined()
  subject: SubjectEnum;

  @Transform(({ value }) => value || null)
  @IsUUID('4')
  @IsOptional()
  departmentId: string;

  @IsUUID('4')
  @IsDefined()
  universityId: string;

  @Transform(({ value }) => value || null)
  @IsEnum(SessionEnum)
  @IsOptional()
  session: SessionEnum;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  year: string;

  @Transform(({ value }) => value || null)
  @IsEnum(PriorityEnum)
  @IsOptional()
  priority: PriorityEnum;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  ielts: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  toefl: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  duolingo: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  pte: string;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  gre: string;

  @Transform(({ value }) => value || null)
  @IsDateString()
  @IsOptional()
  priorityDate: Date;

  @Transform(({ value }) => value || null)
  @IsDateString()
  @IsOptional()
  endDate: Date;

  @Transform(({ value }) => value || null)
  @IsString()
  @IsOptional()
  note: string;
}
