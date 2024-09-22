import { JwtAuthGuard } from '@admin/auth/guards';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CreateTaskDto,
  TaskResponseDto,
  FilterTaskDto,
  UpdateTaskDto,
} from '../dtos';
import { TaskService } from '../services/task.service';

@UseGuards(JwtAuthGuard)
@Controller({ path: 'tasks', version: '1' })
export class TaskController {
  private logger = new Logger(TaskController.name);

  constructor(private readonly taskService: TaskService) {}

  @Get('/')
  async getTasks(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterTaskDto: FilterTaskDto,
  ): Promise<BaseApiSuccessResponse<TaskResponseDto[]>> {
    this.logger.verbose(`User "${ctx.user?.email}" retieving all Tasks.`);

    const tasks = await this.taskService.getTasks(ctx, filterTaskDto);

    return {
      success: true,
      statusCode: 'task-200',
      message: `List of tasks`,
      totalRecords: tasks.length,
      data: tasks,
    };
  }

  @Get('/:id')
  async getTask(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<TaskResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving Task info. of id: ${id}`,
    );

    const task = await this.taskService.getTask(ctx, id);

    return {
      success: true,
      statusCode: 'task-200',
      message: `Details of task of id: ${id}`,
      data: task,
    };
  }

  @Post('/')
  async createTask(
    @RequestContext() ctx: RequestContextDto,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<BaseApiSuccessResponse<TaskResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" creating new Task.`);

    const task = await this.taskService.createTask(ctx, createTaskDto);

    return {
      success: true,
      statusCode: 'task-201',
      message: `New task of id: ${task.id} created`,
      data: task,
    };
  }

  @Put('/:id')
  async updateTask(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<BaseApiSuccessResponse<TaskResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating Task of id ${id}.`);

    const task = await this.taskService.updateTask(ctx, id, updateTaskDto);

    return {
      success: true,
      statusCode: 'task-200',
      message: `Task of id ${id} updated`,
      data: task,
    };
  }

  @Put('/change-status/:id')
  async changeStatusTask(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<BaseApiSuccessResponse<TaskResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating Task of id ${id}.`);

    const task = await this.taskService.changeStatusTask(
      ctx,
      id,
      updateTaskDto,
    );

    return {
      success: true,
      statusCode: 'task-200',
      message: `Task of id ${id} status updated`,
      data: task,
    };
  }

  @Delete('/:id')
  async deleteTask(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<TaskResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a Task. of id: ${id}`,
    );

    const task = await this.taskService.deleteTask(ctx, id);

    return {
      success: true,
      statusCode: 'task-200',
      message: `Task of id ${id} deleted`,
      data: task,
    };
  }
}
