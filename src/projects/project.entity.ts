import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text',{nullable:true})
  description: string;

  @Column({default:false})
  published: boolean;

  @Column({type:'float', default:0})
  goal_amount: number;

  @ManyToOne(() => User, u => u.projects, {nullable:false})
  owner: User;
}
