import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService:UsersService, private jwt:JwtService){}

  async register(email:string, password:string, role:'investor'|'creator', name?:string){
    const existing = await this.usersService.findByEmail(email);
    if(existing) throw new Error('Email already exists');
    const user = await this.usersService.create(email,password,role,name);
    const token = this.jwt.sign({sub:user.id, role:user.role});
    return {user, token};
  }

  async login(email:string, password:string){
    const user = await this.usersService.findByEmail(email);
    if(!user) throw new UnauthorizedException();
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) throw new UnauthorizedException();
    const token = this.jwt.sign({sub:user.id, role:user.role});
    
    return {user, token};
  }
}
