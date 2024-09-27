import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Category with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Category of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Category`);
  }
}
