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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // short name / abbreviation
  @Column({ nullable: true })
  acronym: string;

  @Column({ name: 'country_id' })
  countryId: string;
  @ManyToOne((_type) => CountryEntity, (country) => country.states, {
    onDelete: 'CASCADE',
  })
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
