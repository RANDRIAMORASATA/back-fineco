import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>
  ) {}

  async create(email:string, password:string, role:'investor'|'creator', name?:string){
    const hash = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({email, password:hash, role, name});
    return this.usersRepo.save(user);
  }

  findByEmail(email:string){ return this.usersRepo.findOne({where:{email}}); }
  findById(id:number){ return this.usersRepo.findOne({where:{id}}); }
  async update(id:number, data:Partial<User>){ await this.usersRepo.update(id, data); return this.findById(id); }
  async delete(id:number){ return this.usersRepo.delete(id); }
}
