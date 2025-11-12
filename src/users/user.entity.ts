import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Investment } from '../investments/investment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  email: string;

  @Column()
  password: string;

  @Column({default:'investor'})
  role: 'investor' | 'creator';

  @Column({nullable:true})
  name: string;

  @OneToMany(() => Project, p => p.owner)
  projects: Project[];

  @OneToMany(() => Investment, i => i.investor)
  investments: Investment[];
}
