import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Repository } from 'typeorm';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogGeneratedBy } from '../enums/log-generated-by.enum';
import { CreateLogDto } from '../dtos/create-log.dto';
import { FilterLogDto } from '../dtos/filter-log.dto';
import { UpdateLogDto } from '../dtos/update-log.dto';
import { LogEntity } from '../entities/log.entity';

@Injectable()
export class LogService {
  private logger = new Logger(LogService.name);

  constructor(
    @InjectRepository(LogEntity)
    private readonly logRepo: Repository<LogEntity>,
  ) {}

  async getLogs(
    ctx: RequestContextDto,
    filterLogDto: FilterLogDto,
  ): Promise<LogEntity[]> {
    this.logger.log(`${this.getLogs.name} Called`);

    const start = process.hrtime();

    const { actionType, refId, refTable, note, createdById } = filterLogDto;

    const qb = this.logRepo
      .createQueryBuilder('log')
      .select(['log', 'event', 'createdBy'])
      .leftJoin('log.event', 'event')
      .leftJoin('log.createdBy', 'createdBy')
      .orderBy('log.createdAt', 'ASC');

    if (refId) qb.andWhere({ refId });
    if (refTable) qb.andWhere({ refTable });
    if (actionType) qb.andWhere({ actionType });
    if (note) qb.andWhere({ note });
    if (createdById) qb.andWhere({ createdById });

    qb.orderBy('log.createdAt', 'DESC');

    const results = await qb.getMany();

    const stop = process.hrtime(start);
    this.logger.log(`Getting logs took ${(stop[0] * 1e9 + stop[1]) / 1e6} ms`);

    return results;
  }

  async getLog(ctx: RequestContextDto, id: string): Promise<LogEntity> {
    this.logger.log(`${this.getLog.name} Called`);

    const log = await this.logRepo.findOne({ where: { id } });
    if (!log) {
      throw new NotFoundException(`Log of id#${id} not found.`);
    }

    return log;
  }

  createLog(ctx: RequestContextDto, createLogDto: CreateLogDto) {
    this.logger.log(`${this.createLog.name} Called`);

    const log = this.logRepo.create(createLogDto);

    if (!ctx) log.generatedBy = LogGeneratedBy.System;
    else {
      log.generatedBy = LogGeneratedBy.User;
      log.createdById = ctx.user?.id;
      log.requestId = ctx.requestId;
      log.requestIp = ctx.ip;
    }

    return this.logRepo.save(log);
  }

  createSystemLog(createLogDto: CreateLogDto) {
    this.logger.log(`${this.createSystemLog.name} Called`);

    const log = this.logRepo.create(createLogDto);
    log.generatedBy = LogGeneratedBy.System;

    return this.logRepo.save(log);
  }

  async updateLog(
    ctx: RequestContextDto,
    id: string,
    updateLogDto: UpdateLogDto,
  ): Promise<LogEntity> {
    this.logger.log(`${this.updateLog.name} Called`);

    const log = await this.logRepo.findOne({ where: { id } });
    if (!log) {
      throw new NotFoundException(`Log of id#${id} not found.`);
    }

    this.logRepo.merge(log, updateLogDto);
    return this.logRepo.save(log);
  }

  async deleteLog(ctx: RequestContextDto, id: string): Promise<LogEntity> {
    this.logger.log(`${this.deleteLog.name} Called`);

    const log = await this.getLog(ctx, id);

    return this.logRepo.remove(log);
  }
}
