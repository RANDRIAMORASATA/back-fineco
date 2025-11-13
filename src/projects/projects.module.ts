import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from '../users/users.module';
import { User } from '../users/user.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Project, User]), UsersModule],
  providers:[ProjectsService],
  controllers:[ProjectsController],
  exports:[ProjectsService]
})
export class ProjectsModule {}
