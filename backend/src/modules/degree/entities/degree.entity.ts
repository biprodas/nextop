import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('degrees')
export class DegreeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  acronym: string;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Degree with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Degree of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Degree`);
  }
}
