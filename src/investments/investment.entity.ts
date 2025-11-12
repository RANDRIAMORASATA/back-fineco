import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity()
export class Investment {
  @PrimaryGeneratedColumn()
  id:number;

  @ManyToOne(() => User, u => u.investments, {nullable:false})
  investor: User;

  @ManyToOne(() => Project, {nullable:false})
  project: Project;

  @Column({type:'float', default:0})
  amount: number;

  @Column({nullable:true})
  txId: string;
}
