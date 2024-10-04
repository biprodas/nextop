import { DepartmentEntity } from '@modules/department/entities/department.entity';
import { UniversityEntity } from '@modules/university/entities/university.entity';
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

@Entity('professors')
export class ProfessorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  details: string;

  @Column({ name: 'university_id', type: 'uuid', nullable: true })
  universityId: string;
  @ManyToOne((_type) => UniversityEntity, (uni) => uni.professors, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'university_id' })
  university: UniversityEntity;

  @Column({ name: 'department_id', type: 'uuid', nullable: true })
  departmentId: string;
  @ManyToOne((_type) => DepartmentEntity, (dept) => dept.professors, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'department_id' })
  department: DepartmentEntity;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Professor with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Professor of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Professor`);
  }
}
