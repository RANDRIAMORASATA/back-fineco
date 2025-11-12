import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.investments)
  investor: User;

  @ManyToOne(() => Project)
  project: Project;

  @Column()
  amount: number; 
}
