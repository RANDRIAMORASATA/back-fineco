import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth:AuthService){}

  @Post('register')
  async register(@Body() body:any){
    const {email,password,role,name} = body;
    return this.auth.register(email,password,role,name);
  }

  @Post('login')
  async login(@Body() body:any){
    const {email,password} = body;
    return this.auth.login(email,password);
  }
}
