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

  // BD
  @Column({ name: 'alpha_2', nullable: true })
  alpha2: string;

  // BGD
  @Column({ name: 'alpha_3', nullable: true })
  alpha3: string;

  // 050
  @Column({ nullable: true })
  code: string;

  // +880
  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  capital: string;

  @Column({ name: 'currency_code', nullable: true })
  currencyCode: string;

  @Column({ name: 'currency_name', nullable: true })
  currencyName: string;

  @Column({ type: 'simple-array', nullable: true })
  languages: string[];

  // flag

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
