import { StateEntity } from '@modules/state/entities/state.entity';
import { UniversityEntity } from '@modules/university/entities/university.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('countries')
export class CountryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // ISO Alpha-2 Code: BD
  @Column({ name: 'alpha_2_code', nullable: true })
  alpha2Code: string;

  // ISO Alpha-3 Code: BGD
  @Column({ name: 'alpha_3_code', nullable: true })
  alpha3Code: string;

  // ISO Numeric Code: 050
  @Column({ name: 'numeric_code', nullable: true })
  numericCode: string;

  // Phone Code: +880
  @Column({ name: 'calling_code', nullable: true })
  callingCode: string;

  // relations
  @OneToMany((_type) => StateEntity, (state) => state.country)
  states: StateEntity[];

  @OneToMany((_type) => UniversityEntity, (university) => university.country)
  universities: UniversityEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Country with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Country of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Country of id ${this.id}`);
  }
}
