import { IsString, IsUUID } from 'class-validator';

export class FilterTaskDto {
  @IsString()
  title?: string;

  @IsUUID()
  userId?: string;

  @IsString()
  status: string;
}
