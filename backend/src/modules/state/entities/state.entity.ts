import { CountryEntity } from '@modules/country/entities/country.entity';
import { UniversityEntity } from '@modules/university/entities/university.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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
  @ManyToOne((_type) => CountryEntity, (country) => country.states)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  // relations
  @OneToMany((_type) => UniversityEntity, (university) => university.state)
  universities: UniversityEntity[];

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
