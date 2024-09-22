import { RequestContextDto } from '@common/dtos/request-context.dto';
import {
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, FilterTaskDto, UpdateTaskDto } from '../dtos';
import { GenerateTaskDto } from '../dtos/generate-task.dto';
import { TaskEntity } from '../entities/task.entity';
import { CreateLogDto } from '@modules/log/dtos';
import { RefTable } from '@modules/log/enums';
import { UserService } from '@admin/user/services/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  private logger = new Logger(TaskService.name);

  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
    private readonly userService: UserService,
  ) {}

  async getTasks(
    ctx: RequestContextDto,
    filterTaskDto: FilterTaskDto,
  ): Promise<TaskEntity[]> {
    this.logger.log(`${this.getTasks.name} Called`);

    const { userId, status } = filterTaskDto;

    console.log(filterTaskDto);

    const start = process.hrtime();

    const qb = this.taskRepo.createQueryBuilder('task');
    qb.select(['task', 'assignees']);
    qb.leftJoin('task.assignees', 'assignees');
    if (status)
      qb.where('task.status IN (:...statuses)', {
        statuses: status.split(','),
      });
    if (userId) qb.andWhere('assignees.id =:id', { id: userId });
    qb.orderBy('task.createdAt', 'ASC');

    const result = await qb.getMany();

    const stop = process.hrtime(start);
    this.logger.log(`Getting Task took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

    return result;
  }

  async getTask(ctx: RequestContextDto, id: string): Promise<TaskEntity> {
    this.logger.log(`${this.getTask.name} Called`);

    const task = await this.taskRepo.findOne({
      where: { id },
      relations: ['assignees', 'assignedBy', 'createdBy', 'updatedBy', 'event'],
    });

    if (!task) {
      throw new NotFoundException(`Task of id ${id} not found`);
    }

    return task;
  }

  async generateTask(generateTaskDto: GenerateTaskDto): Promise<TaskEntity> {
    this.logger.log(`${this.generateTask.name} Called`);

    // generate task by system
    const task = this.taskRepo.create(generateTaskDto);
    return this.taskRepo.save(task);
  }

  async createTask(
    ctx: RequestContextDto,
    createTaskDto: CreateTaskDto,
  ): Promise<TaskEntity> {
    this.logger.log(`${this.createTask.name} Called`, createTaskDto);

    const users = await Promise.all(
      [...new Set(createTaskDto.usersId)].map(async (userId) =>
        this.userService.getUser(userId),
      ),
    );

    const task = this.taskRepo.create(createTaskDto);
    task.createdById = ctx.user.id;
    task.assignees = users;
    await this.taskRepo.save(task);

    return task;
  }

  async createTasks(
    ctx: RequestContextDto,
    createTasksDto: CreateTaskDto[],
  ): Promise<TaskEntity[]> {
    this.logger.log(`${this.createTask.name} Called`);

    const tasks = this.taskRepo.create(createTasksDto);
    await this.taskRepo.save(tasks);

    return tasks;
  }

  async changeStatusTask(
    ctx: RequestContextDto,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    this.logger.log(`${this.updateTask.name} Called`);
    const { status } = updateTaskDto;

    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task of id ${id} not found`);
    }

    const logDto = {
      code: task.idNo + ' - ' + task.title,
      details: `Task "${task.idNo + ' - ' + task.title}" Status Change Updated`,
      data: updateTaskDto,
      refId: task.id,
      refTable: RefTable.Task,
    } as CreateLogDto;
    //  save log

    task.status = status;
    await this.taskRepo.save(task);

    return task;
  }

  async updateTask(
    ctx: RequestContextDto,
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskEntity> {
    this.logger.log(`${this.updateTask.name} Called`);
    const { usersId, ...restUpdateTaskDto } = updateTaskDto;

    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task of id ${id} not found`);
    }

    const logDto = {
      code: task.idNo + ' - ' + task.title,
      details: `Task "${task.idNo + ' - ' + task.title}" Updated`,
      data: updateTaskDto,
      refId: task.id,
      refTable: RefTable.Task,
    } as CreateLogDto;
    //save log

    task.updatedById = ctx.user.id;

    const users = await Promise.all(
      [...new Set(updateTaskDto.usersId)].map(async (userId) =>
        this.userService.getUser(userId),
      ),
    );

    Object.assign(task, restUpdateTaskDto, { assignees: users });
    await this.taskRepo.save(task);

    return this.getTask(ctx, id);
  }

  async deleteTask(ctx: RequestContextDto, id: string): Promise<TaskEntity> {
    this.logger.log(`${this.deleteTask.name} Called`);

    const task = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task of id ${id} not found`);
    }

    const logDto = {
      code: task.idNo + ' - ' + task.title,
      details: `Task "${task.idNo + ' - ' + task.title}" Deleted`,
      data: null,
      refId: task.id,
      refTable: RefTable.Task,
    } as CreateLogDto;
    // save log

    return this.taskRepo.remove(task);
  }
}
