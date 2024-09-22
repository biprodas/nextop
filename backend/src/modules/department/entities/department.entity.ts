import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
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
