import { CountryEntity } from '@modules/country/entities/country.entity';
import { StateEntity } from '@modules/state/entities/state.entity';
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

@Entity('universities')
export class UniversityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // website
  // ranking
  // no of student
  // category: [Public, Private]

  @Column({ name: 'country_id', type: 'number' })
  countryId: number;
  @ManyToOne((_type) => CountryEntity, (country) => country.universities)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column({ name: 'state_id', type: 'number', nullable: true })
  stateId: number;
  @ManyToOne((_type) => StateEntity, (state) => state.universities, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted University with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated University of id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed University of id ${this.id}`);
  }
}
