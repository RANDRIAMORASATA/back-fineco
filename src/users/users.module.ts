import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { HederaModule } from '../hedera/hedera.module'; // ← importer le module

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HederaModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
