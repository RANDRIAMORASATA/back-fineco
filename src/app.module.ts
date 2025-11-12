import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { InvestmentsModule } from './investments/investments.module';

import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Investment } from './investments/investment.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // ← ajoute ceci pour lire .env
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'fineco',
      password: process.env.DB_PASSWORD || 'fineco',
      database: process.env.DB_NAME || 'mvp_fineco',
      entities: [User, Project, Investment],
      synchronize: false, 
    }),
    UsersModule,
    AuthModule,
    ProjectsModule,
    InvestmentsModule,
  ],
})
export class AppModule {}
