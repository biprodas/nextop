import { Controller, Get } from '@nestjs/common';
import { TasksService } from './task.service';

@Controller({ path: 'tasks', version: '1' })
export class TaskController {
  constructor(private readonly taskService: TasksService) {}

  @Get('/')
  getHello() {
    return this.taskService.findAll();
  }
}
