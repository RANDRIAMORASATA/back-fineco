import { Controller, Get, Patch, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Req() req) {
    return this.usersService.findById(req.user.id);
  }

  

  @UseGuards(JwtAuthGuard)
    @Patch('me')
    updateProfile(@Req() req, @Body() body: any) {
      return this.usersService.update(req.user.id, body);
  }


  @UseGuards(JwtAuthGuard)
  @Delete('me')
  deleteProfile(@Req() req) {
    return this.usersService.delete(req.user.id);
  }
}
