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

  @Column({ name: 'department_id' })
  departmentId: string;
  @ManyToOne((_type) => DepartmentEntity, (department) => department.programs)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @Column({ name: 'university_id' })
  universityId: string;
  @ManyToOne((_type) => UniversityEntity, (university) => university.programs)
  @JoinColumn({ name: 'university_id' })
  university: UniversityEntity;

  @Column({ type: 'enum', enum: PriorityEnum, nullable: true })
  priority: PriorityEnum;

  @Column()
  ielts: string;

  @Column()
  toefl: string;

  @Column()
  duolingo: string;

  @Column()
  pte: string;

  @Column()
  gre: string;

  // list of professors

  // targetDate
  // endDate

  @Column({ nullable: true })
  notes: string;

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
