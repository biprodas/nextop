import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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

  // university
  // department

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
