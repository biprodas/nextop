import { UserDto } from '@admin/user/dtos/user.dto';
import { Expose } from 'class-transformer';
import { LogActionType } from '../enums/log-action-type.enum';
import { LogGeneratedBy } from '../enums/log-generated-by.enum';
import { LogLevel } from '../enums/log-level.enum';
import { RefTable } from '../enums/ref-table.enum';

export class LogDto {
  @Expose()
  id: string;

  @Expose()
  level: LogLevel;

  @Expose()
  actionType: LogActionType;

  // @Expose()
  // message: string;

  @Expose()
  details: string;

  // @Expose()
  // data: any;

  @Expose()
  note: string;

  @Expose()
  refId: string;

  @Expose()
  refTable: RefTable;

  @Expose()
  generatedBy: LogGeneratedBy;

  @Expose()
  createdById: string;

  @Expose()
  createdBy: UserDto;

  @Expose()
  createdAt: Date;
}
