import { CountryEntity } from '@modules/country/entities/country.entity';
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

@Entity('states')
export class StateEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ name: 'country_id', type: 'number' })
  countryId: number;
  @ManyToOne((_type) => CountryEntity, (log) => log.states)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted State with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated State of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed State of id ${this.id}`);
  }
}
