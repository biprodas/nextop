import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Priority, TaskStatus } from '../enums';
import { UserEntity } from '@admin/user/entities/user.entity';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'id_no', unique: true, type: 'bigint' })
  @Generated('increment')
  idNo: number;

  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'start_date', type: 'timestamptz', nullable: true })
  startDate: Date;

  @Column({ name: 'target_date', type: 'timestamptz', nullable: true })
  targetDate: Date;

  @Column({ type: 'enum', enum: Priority, nullable: true })
  priority: Priority;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.Open })
  status: TaskStatus;

  // @Column({ name: 'event_id', type: 'uuid', nullable: true })
  // eventId: string;
  // @ManyToOne((_type) => EventEntity, { onDelete: 'CASCADE' })
  // @JoinColumn({ name: 'event_id' })
  // event: EventEntity;

  @ManyToMany(() => UserEntity, (user) => user.tasks, {
    cascade: true,
    eager: true,
  })
  @JoinTable({
    name: 'tasks_users',
    joinColumn: {
      name: 'task_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  assignees: UserEntity[];

  @Column({ name: 'assigned_by_id', type: 'uuid', nullable: true })
  assignedById: string;
  @ManyToOne((_type) => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'assigned_by_id' })
  assignedBy: UserEntity;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ name: 'created_by_id', type: 'uuid', nullable: true })
  createdById: string;
  @ManyToOne((_type) => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by_id' })
  createdBy: UserEntity;

  @Column({ name: 'updated_by_id', type: 'uuid', nullable: true })
  updatedById: string;
  @ManyToOne((_type) => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'updated_by_id' })
  updatedBy: UserEntity;

  // relations
  // @OneToMany((_type) => NoteEntity, (note) => note.task)
  // notes: NoteEntity[];

  // @OneToMany((_type) => NoteEntity, (note) => note.task)
  // logs: NoteEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Task with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Task with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Task`);
  }
}
