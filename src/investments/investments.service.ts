import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Investment } from './investment.entity';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Injectable()
export class InvestmentsService {
  constructor(@InjectRepository(Investment) private repo:Repository<Investment>){}

  async invest(investor:User, project:Project, amount:number){
    // In a real app integrate payment / Hedera here.
    // For demo, we simply create an investment record.
    const inv = this.repo.create({investor, project, amount, txId: 'SIMULATED-TX-' + Date.now()});
    return this.repo.save(inv);
  }
}
