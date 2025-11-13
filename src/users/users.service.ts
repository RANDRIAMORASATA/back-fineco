import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt'; 
import { HederaService } from '../hedera/hedera.service'; //
import { CreateUserDto } from './create-user.dto'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    private hederaService: HederaService,
  ) {}

  async create(email: string, password: string, role: 'investor' | 'creator', name?: string) {
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ email, password: hash, role, name });
    return this.usersRepo.save(user);
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  findById(id: number) {
    return this.usersRepo.findOne({ where: { id } });
  }


async update(id: number, data: Partial<User>) {
  const user = await this.findById(id);
  if (!user) throw new Error('User not found');

  delete data.role; // on ne modifie pas le rôle

  // Vérifie si l'email existe déjà pour un autre utilisateur
  if (data.email && data.email !== user.email) {
    const existing = await this.findByEmail(data.email);
    if (existing && existing.id !== id) {
      throw new Error('Email already in use');
    }
  }

  await this.usersRepo.update(id, data);
  return this.findById(id);
}




  async delete(id: number) {
    const user = await this.findById(id);
    if (!user) throw new Error('User not found');
    return this.usersRepo.delete(id);
  }

  async createCreator(userDto: CreateUserDto) {
  const user = this.usersRepo.create(userDto);

  // Si rôle = creator, créer un compte Hedera
  if (user?.role === 'creator') {
    const { accountId, privateKey } = await this.hederaService.createHederaAccount();
    user.hederaAccountId = accountId;
    user.hederaPrivateKey = privateKey;
  }

  return this.usersRepo.save(user);
}

}
