import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { LogActionType } from '@modules/log/enums/log-action-type.enum';
import { LogGeneratedBy } from '../enums/log-generated-by.enum';
import { UserEntity } from '@admin/user/entities/user.entity';
import { LogLevel } from '../enums/log-level.enum';
import { RefTable } from '../enums/ref-table.enum';

@Entity('logs')
export class LogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: LogLevel, default: LogLevel.Info })
  level: LogLevel;

  @Column({ name: 'action_type', type: 'enum', enum: LogActionType })
  actionType: LogActionType;

  // @Column()
  // context: string;

  // @Column()
  // message: string;

  // show / hide

  @Column()
  code: string;

  @Column({ name: 'details', nullable: true })
  details: string;

  @Column({ type: 'jsonb', nullable: true })
  data: any;

  @Column({ nullable: true })
  note: string;

  @Column({ name: 'ref_id', type: 'uuid', nullable: true })
  refId: string;

  @Column({ name: 'ref_table', type: 'enum', enum: RefTable, nullable: true })
  refTable: RefTable;

  @Column({ name: 'generated_by', type: 'enum', enum: LogGeneratedBy })
  generatedBy: LogGeneratedBy;

  // @Column({ name: 'event_id', type: 'uuid', nullable: true })
  // eventId: string;
  // @ManyToOne((_type) => EventEntity, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'event_id' })
  // event: EventEntity;

  @Column({ name: 'request_id', type: 'uuid', nullable: true })
  requestId: string;

  @Column({ name: 'request_ip', nullable: true })
  requestIp: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  createdById: string;
  @ManyToOne((_type) => UserEntity, (log) => log.activityLogs, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: UserEntity;

  // generatedBy=System and createdById=uuid => User "x" er kono action er karon a indirectly generate hoyece
  // generatedBy=System and createdById=null => System auto generate korece

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Log Inserted #ID: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Log Updated #ID: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Log Removed`);
  }
}
