import { Controller, Post, Body } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';

@Controller('investments')
export class InvestmentsController {
  constructor(private inv:InvestmentsService, private users:UsersService, private projects:ProjectsService){}

  @Post()
  async invest(@Body() body:any){
    const {investorId, projectId, amount} = body;
    const investor = await this.users.findById(investorId);
    const project = await this.projects.findById(projectId);
    return this.inv.invest(investor, project, Number(amount));
  }
}
