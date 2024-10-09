import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProgramDto, FilterProgramDto, UpdateProgramDto } from '../dtos';
import { ProgramEntity } from '../entities/program.entity';

@Injectable()
export class ProgramService {
  private logger = new Logger(ProgramService.name);

  constructor(
    @InjectRepository(ProgramEntity)
    private readonly programRepo: Repository<ProgramEntity>,
  ) {}

  getPrograms(
    _ctx: RequestContextDto,
    dto: FilterProgramDto,
  ): Promise<ProgramEntity[]> {
    this.logger.log(`${this.getPrograms.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.programRepo.find({ where: reqQuery });
  }

  async getProgram(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<ProgramEntity> {
    this.logger.log(`${this.getProgram.name} Service Called`);

    const program = await this.programRepo.findOne({ where: { id } });
    if (!program) {
      throw new NotFoundException(`Program of id ${id} not found.`);
    }

    return program;
  }

  async createProgram(
    _ctx: RequestContextDto,
    dto: CreateProgramDto,
  ): Promise<ProgramEntity> {
    this.logger.log(`${this.createProgram.name} Service Called`);

    const program = this.programRepo.create(dto);

    program.name = dto.degree + ' in ' + dto.subject;

    return this.programRepo.save(program);
  }

  async updateProgram(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateProgramDto,
  ): Promise<ProgramEntity> {
    this.logger.log(`${this.updateProgram.name} Service Called`);

    const program = await this.getProgram(ctx, id);
    this.programRepo.merge(program, dto);

    return this.programRepo.save(program);
  }

  async deleteProgram(
    ctx: RequestContextDto,
    id: string,
  ): Promise<ProgramEntity> {
    this.logger.log(`${this.deleteProgram.name} Service Called`);

    const program = await this.getProgram(ctx, id);

    return this.programRepo.remove(program);
  }
}
