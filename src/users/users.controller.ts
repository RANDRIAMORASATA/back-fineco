import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService:UsersService){}

  @Get(':id')
  get(@Param('id') id:number){ return this.usersService.findById(Number(id)); }

  @Patch(':id')
  update(@Param('id') id:number, @Body() body:any){ return this.usersService.update(Number(id), body); }

  @Delete(':id')
  remove(@Param('id') id:number){ return this.usersService.delete(Number(id)); }
}
