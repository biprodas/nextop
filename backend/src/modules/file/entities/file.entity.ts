import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StorageType } from '../enums/storage-type.enum';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'storage_type',
    type: 'enum',
    enum: StorageType,
    default: StorageType.LOCAL,
  })
  storageType: StorageType;

  @Column({ name: 'public_key', type: 'uuid', unique: true })
  publicKey: string;

  @Column({ name: 'private_key', type: 'uuid', unique: true })
  privateKey: string;

  @Column({ nullable: true })
  fieldname: string;

  @Column({ nullable: true })
  originalname: string;

  @Column({ nullable: true })
  encoding: string;

  @Column({ nullable: true })
  mimetype: string;

  // bucket in S3
  @Column({ nullable: true })
  destination: string;

  // key in S3
  @Column()
  filename: string;

  // location in S3
  @Column()
  path: string;

  @Column({ nullable: true })
  size: number;

  @UpdateDateColumn({
    name: 'modified_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public modifiedAt: Date;

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted File with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated File with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`File Removed`);
  }
}
