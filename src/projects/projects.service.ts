import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(@InjectRepository(Project) private repo: Repository<Project>) {}

  // Créer un projet
  async create(data: Partial<Project>, owner: User) {
    const project = this.repo.create({ ...data, owner });
    return this.repo.save(project);
  }

  // Tous les projets
  findAll() {
    return this.repo.find({ relations: ['owner'] });
  }

  // Tous les projets publiés
  findAllPublished() {
    return this.repo.find({ where: { published: true }, relations: ['owner'] });
  }

  // Projets par owner
  findByOwner(ownerId: number) {
    return this.repo.find({ where: { owner: { id: ownerId } }, relations: ['owner'] });
  }

  // Projet par ID
  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['owner'] });
  }

  // Mettre à jour un projet
  async update(id: number, data: Partial<Project>) {
    await this.repo.update(id, data);
    return this.findById(id);
  }

  //delete
  delete(id: number) {
    return this.repo.delete(id);
  }

}
