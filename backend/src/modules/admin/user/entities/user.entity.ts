import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { LogEntity } from '@modules/log/entities/log.entity';
import { TokenEntity } from '@admin/token/entities/token.entity';
import { UserStatus } from '../enums/user-status.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserGender } from '../enums/user-gender.enum';
import { TaskEntity } from '@modules/task/entities/task.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, array: true, nullable: true })
  roles: UserRole[];

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ type: 'enum', enum: UserGender, nullable: true })
  gender: UserGender;

  @Column({ nullable: true })
  address: string;

  // super admin of the whole system
  @Column({ name: 'is_admin', default: false })
  isAdmin: boolean;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus;

  // relations
  @OneToMany((_type) => TokenEntity, (rtoken) => rtoken.user)
  tokens: TokenEntity[];

  @OneToMany((_type) => LogEntity, (log) => log.createdBy)
  activityLogs: LogEntity[];

  @ManyToMany((_type) => TaskEntity, (taks) => taks.assignees)
  tasks: TaskEntity[];

  // Hooks
  // @BeforeInsert()
  // async hashPassword(){
  //   this.password = await bcrypt.hash(this.password, 10);
  // }

  @AfterInsert()
  logInsert() {
    console.log(`Inserted User of id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated User of id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User of id: ${this.id}`);
  }
}
