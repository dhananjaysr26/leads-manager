import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum LeadsStatus {
  GENERATED = 'generated',
  ACKNOWLEDGED = 'acknowledged',
}

@Entity('leads_data')
export class Lead_Data {
  @PrimaryGeneratedColumn()
  lead_id: number;

  @Column({ length: 50, nullable: false })
  applicant_name: string;

  @Column({ precision: 20, type: 'numeric' })
  applicant_number: number;

  @Column({ length: 250, nullable: false })
  applicant_address: string;

  @Column({ length: 50, nullable: false })
  district: string;

  @Column({ length: 50, nullable: false })
  state: string;

  @Column({
    type: 'enum',
    enum: LeadsStatus,
    default: LeadsStatus.GENERATED,
    nullable: false,
  })
  status: LeadsStatus;

  @Column()
  @ManyToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'generated_by' })
  generated_by: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
