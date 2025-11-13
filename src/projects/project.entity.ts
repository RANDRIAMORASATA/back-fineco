import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
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

 @ManyToMany(() => User)
  @JoinTable()
  investors: User[];


  @ManyToOne(() => User, u => u.projects, {nullable:false})
  owner: User;

  @Column({ type: 'float', default: 0 })
  receivedAmountHbar: number;
}
