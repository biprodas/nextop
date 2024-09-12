import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterUpdate,
  AfterRemove,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
  AfterLoad,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../user/entities/user.entity';
import { TokenType } from '../enums/token-type.enum';

@Entity('tokens')
export class TokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TokenType })
  type: TokenType;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'created_by_ip' })
  createdByIp: string;

  @Column({ name: 'expires_at', type: 'timestamp with time zone' })
  expiresAt: Date;

  @Column({ name: 'revoked_at', type: 'timestamp with time zone', nullable: true })
  revokedAt: Date;

  @Column({ name: 'revoked_by_ip', nullable: true })
  revokedByIp: string;

  @Column({ name: 'replaced_by_id', type: 'uuid', nullable: true })
  replacedById: string; // replace by token

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP(6)' })
  updatedAt: Date;

  // virtuals
  // readonly
  isExpired: boolean;
  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  getIsExpired() {
    this.isExpired = new Date() >= this.expiresAt;
  }

  // readonly
  isActive: boolean;
  @AfterLoad()
  @AfterInsert()
  @AfterUpdate()
  getIsActive() {
    this.isActive = !this.revokedAt && !this.isExpired;
  }

  // relations
  @ManyToOne((_type) => UserEntity, (user) => user.tokens, {
    eager: true,
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne((_type) => TokenEntity, (rtoken) => rtoken.replacedTokens)
  @JoinColumn({ name: 'replaced_by_id' })
  replacedBy: TokenEntity;

  @OneToMany((_type) => TokenEntity, (rtoken) => rtoken.replacedBy)
  replacedTokens: TokenEntity[];

  // hooks
  @AfterInsert()
  logInsert() {
    console.log(`Inserted Token with id: ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Token with id: ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed User Token id: ${this.id}`);
  }
}
