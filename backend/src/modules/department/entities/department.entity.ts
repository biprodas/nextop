import { ProfessorEntity } from '@modules/professor/entities/professor.entity';
import { ProgramEntity } from '@modules/program/entities/program.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('departments')
export class DepartmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  acronym: string;

  // relations
  @OneToMany((_type) => ProgramEntity, (program) => program.department)
  programs: ProgramEntity[];

  @OneToMany((_type) => ProfessorEntity, (professor) => professor.department)
  professors: ProfessorEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Department with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Department of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Department`);
  }
}
