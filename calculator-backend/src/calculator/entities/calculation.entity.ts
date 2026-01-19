import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Calculation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  num1: number;

  @Column()
  num2: number;

  @Column()
  operator: string;

  @Column('float')
  result: number;

  @CreateDateColumn()
  createdAt: Date;
}
