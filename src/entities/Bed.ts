import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('beds')
export class Bed {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  status: string

  @Column({ type: 'text', nullable: true })
  name_patient: string

  @Column({ type: 'text', nullable: true })
  document: string

  @Column({ type: 'text', nullable: true })
  allergy: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}