import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'text' })
  name: string

  @Column({ type: 'text' })
  gender: string

  @Column({ type: 'text' })
  birth_date: string

  @Column({ type: 'text' })
  email: string

  @Column({ type: 'text' })
  phone: string

  @Column({ type: 'text' })
  address: string

  @Column({ type: 'int' })
  height: number

  @Column({ type: 'int' })
  weight: number

  @Column({ type: 'text' })
  allergy: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}