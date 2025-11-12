import { Controller, Post, Body, Get, Param, Req, Patch } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { UsersService } from '../users/users.service';

@Controller('projects')
export class ProjectsController {
  constructor(private projects:ProjectsService, private users:UsersService){}

  @Post()
  async create(@Body() body:any){
    const {ownerId, title, description, goal_amount, published} = body;
    const owner = await this.users.findById(ownerId);
    return this.projects.create({title, description, goal_amount, published}, owner);
  }

  @Get('published')
  allPublished(){ return this.projects.findAllPublished(); }

  @Get('owner/:id')
  byOwner(@Param('id') id:number){ return this.projects.findByOwner(Number(id)); }

  @Get(':id')
  get(@Param('id') id:number){ return this.projects.findById(Number(id)); }

  @Patch(':id')
  update(@Param('id') id:number, @Body() body:any){ return this.projects.update(Number(id), body); }
}
