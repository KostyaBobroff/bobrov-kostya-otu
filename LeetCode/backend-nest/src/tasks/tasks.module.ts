import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskByIdPipe } from './pipes/task.pipe';

@Module({
  controllers: [TasksController],
  providers: [TasksService, TaskByIdPipe],
  exports: [TaskByIdPipe, TasksService],
})
export class TasksModule {}
