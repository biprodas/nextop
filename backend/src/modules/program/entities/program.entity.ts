import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SeasonEnum } from '../enums/season.enum';
import { DegreeEnum } from '../enums/degree.enum';
import { DepartmentEntity } from '@modules/department/entities/department.entity';
import { UniversityEntity } from '@modules/university/entities/university.entity';
import { PriorityEnum } from '../enums/priority.enum';

@Entity('programs')
export class ProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // program name: BSc, MS, PhD
  @Column({ type: 'enum', enum: DegreeEnum, nullable: true })
  degree: DegreeEnum;

  @Column({ type: 'enum', enum: SeasonEnum, nullable: true })
  season: SeasonEnum;

  // @Column()
  // year: string;

  @Column({ name: 'department_id', nullable: true })
  departmentId: string;
  @ManyToOne((_type) => DepartmentEntity, (department) => department.programs)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @Column({ name: 'university_id', nullable: true })
  universityId: string;
  @ManyToOne((_type) => UniversityEntity, (university) => university.programs)
  @JoinColumn({ name: 'university_id' })
  university: UniversityEntity;

  @Column({ type: 'enum', enum: PriorityEnum, nullable: true })
  priority: PriorityEnum;

  @Column({ nullable: true })
  ielts: string;

  @Column({ nullable: true })
  toefl: string;

  @Column({ nullable: true })
  duolingo: string;

  @Column({ nullable: true })
  pte: string;

  @Column({ nullable: true })
  gre: string;

  // list of professors

  // targetDate
  // endDate

  @Column({ nullable: true })
  note: string;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Program with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Program of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Program`);
  }
}
