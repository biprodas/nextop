import { StateEntity } from '@modules/state/entities/state.entity';
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
  @PrimaryGeneratedColumn('increment')
  id: number;

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

  // relations
  @OneToMany((_type) => StateEntity, (state) => state.country)
  states: StateEntity[];

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
