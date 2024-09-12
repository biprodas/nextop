import { Controller, Get } from '@nestjs/common';
import { TodoService } from './todo.service';

@Controller({ path: 'todos', version: '1' })
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get('/')
  getHello() {
    return this.todoService.findAll();
  }
}
