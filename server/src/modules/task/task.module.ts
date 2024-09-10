import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { TasksService } from './task.service';
import { TaskController } from './task.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }])],
  controllers: [TaskController],
  providers: [TasksService],
})
export class TaskModule {}
