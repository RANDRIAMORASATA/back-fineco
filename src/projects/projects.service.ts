import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) 
    private repo: Repository<Project>,
    @InjectRepository(User) 
    private usersRepo: Repository<User>
  ) {}

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

  async findByInvestor(investorId: number) {
  return this.repo
    .createQueryBuilder('project')
    .leftJoinAndSelect('project.investors', 'user')
    .where('user.id = :investorId', { investorId })
    .getMany();
}

  async invest(projectId: number, investorId: number, amount: number) {
  const project = await this.repo.findOne({ 
    where: { id: projectId }, 
    relations: ['investors'] 
  });
  if (!project) throw new Error('Project not found');

  const investor = await this.usersRepo.findOne({ where: { id: investorId } });
  if (!investor) throw new Error('Investor not found');

  // Ajouter l'investisseur si pas déjà présent
  if (!project.investors.some(inv => inv.id === investor.id)) {
    project.investors.push(investor);
  }

  // Mettre à jour le montant reçu
  project.receivedAmountHbar = (project.receivedAmountHbar || 0) + amount;

  return this.repo.save(project);
}




}
