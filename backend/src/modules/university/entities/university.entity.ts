import { CountryEntity } from '@modules/country/entities/country.entity';
import { ProgramEntity } from '@modules/program/entities/program.entity';
import { StateEntity } from '@modules/state/entities/state.entity';
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
import { UniversityType } from '../enums/university-type.enum';

@Entity('universities')
export class UniversityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  acronym: string;

  @Column({ type: 'enum', enum: UniversityType, nullable: true })
  type: UniversityType;

  @Column({ nullable: true })
  website: string;

  // global=cs
  @Column({ nullable: true })
  ranking: string;

  // other details
  @Column({ nullable: true })
  details: string;

  @Column({ name: 'country_id', type: 'uuid' })
  countryId: string;
  @ManyToOne((_type) => CountryEntity, (country) => country.universities)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;

  @Column({ name: 'state_id', type: 'uuid', nullable: true })
  stateId: string;
  @ManyToOne((_type) => StateEntity, (state) => state.universities, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'state_id' })
  state: StateEntity;

  // relations

  // relations
  @OneToMany((_type) => ProgramEntity, (program) => program.university)
  programs: ProgramEntity[];

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
    console.log(`Removed University`);
  }
}
