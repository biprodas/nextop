import { Expose } from 'class-transformer';
import { Priority, TaskStatus } from '../enums';
import { UserEntity } from '@admin/user/entities/user.entity';

export class TaskResponseDto {
  @Expose()
  id: string;

  @Expose()
  idNo: number;

  @Expose()
  tags: string[];

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  startDate: Date;

  @Expose()
  targetDate: Date;

  @Expose()
  priority: Priority;

  @Expose()
  status: TaskStatus;

  // @Expose()
  // eventId: string;

  @Expose()
  assignees: UserEntity[];
}
