import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('programs')
export class ProgramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // program name: BSc, MS, PhD
  // departmentId
  // universityId
  // season: Fall, Spring
  // year
  // ielts
  // duolingo
  // tofel
  // pte
  // gre
  // notes / remarks
  // priority
  // list of professors

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
