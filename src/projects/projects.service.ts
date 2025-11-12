import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo:Repository<Project>){}

  create(data:Partial<Project>, owner:User){
    const p = this.repo.create({...data, owner});
    return this.repo.save(p);
  }

  findAllPublished(){ return this.repo.find({where:{published:true}, relations:['owner']}); }
  findByOwner(ownerId:number){ return this.repo.find({where:{owner:{id:ownerId}}, relations:['owner']}); }
  findById(id:number){ return this.repo.findOne({where:{id}, relations:['owner']}); }
  update(id:number, data:Partial<Project>){ return this.repo.update(id, data); }
}
