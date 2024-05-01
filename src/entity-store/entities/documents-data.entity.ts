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
import { Lead_Data } from './leads_data.entity';

@Entity('Document_Data')
export class Document_Data {
  @PrimaryGeneratedColumn()
  document_id: number;

  @Column({ length: 50, nullable: false })
  document_type: string;

  @Column({ length: 100, nullable: false })
  document_name: string;

  @Column({ length: 250, nullable: false })
  document_path: string;

  @Column()
  @ManyToOne(() => Lead_Data, (lead_data) => lead_data.lead_id)
  @JoinColumn({ name: 'lead_id' })
  lead_id: Lead_Data;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
