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
import { DegreeEnum } from '../enums/degree.enum';
import { DepartmentEntity } from '@modules/department/entities/department.entity';
import { UniversityEntity } from '@modules/university/entities/university.entity';
import { PriorityEnum } from '../enums/priority.enum';
import { SubjectEnum } from '../enums/subject.enum';
import { SessionEnum } from '../enums/session.enum';

@Entity('programs')
export class ProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // [degree] in [field]
  @Column()
  name: string;

  // degree/certificates: BSc, MSc, PhD
  @Column({ type: 'enum', enum: DegreeEnum })
  degree: DegreeEnum;

  // Field / field of study (another entity)
  @Column({ type: 'enum', enum: SubjectEnum })
  subject: SubjectEnum;

  // Majors
  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  departmentId: string;
  @ManyToOne((_type) => DepartmentEntity, (department) => department.programs)
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  @Column({ name: 'university_id', type: 'uuid' })
  universityId: string;
  @ManyToOne((_type) => UniversityEntity, (university) => university.programs)
  @JoinColumn({ name: 'university_id' })
  university: UniversityEntity;

  // Fall
  @Column({ type: 'enum', enum: SessionEnum, nullable: true })
  session: SessionEnum;

  // 2025
  @Column({ nullable: true })
  year: string;

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

  @Column({ nullable: true })
  priorityDate: Date;

  // deadline
  @Column({ nullable: true })
  endDate: Date;

  @Column({ nullable: true })
  note: string;

  // usefull links (program website, language profeciency, faculty)

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
