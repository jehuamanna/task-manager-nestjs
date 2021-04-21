import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskRepository } from './task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {PassportModule} from '@nestjs/passport'
@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]),
  AuthModule,
  PassportModule.register({defaultStrategy: 'jwt'}),

],
  controllers: [
    TasksController],
  providers: [TasksService]
})
export class TasksModule {}
