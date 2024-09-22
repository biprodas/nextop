import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStateDto, FilterStateDto, UpdateStateDto } from '../dtos';
import { StateEntity } from '../entities/state.entity';

@Injectable()
export class StateService {
  private logger = new Logger(StateService.name);

  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepo: Repository<StateEntity>,
  ) {}

  getStates(
    _ctx: RequestContextDto,
    dto: FilterStateDto,
  ): Promise<StateEntity[]> {
    this.logger.log(`${this.getStates.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.stateRepo.find({ where: reqQuery });
  }

  async getState(_ctx: RequestContextDto, id: number): Promise<StateEntity> {
    this.logger.log(`${this.getState.name} Service Called`);

    const state = await this.stateRepo.findOne({ where: { id } });
    if (!state) {
      throw new NotFoundException(`State of id ${id} not found.`);
    }

    return state;
  }

  async createState(
    _ctx: RequestContextDto,
    dto: CreateStateDto,
  ): Promise<StateEntity> {
    this.logger.log(`${this.createState.name} Service Called`);

    const state = this.stateRepo.create(dto);

    return this.stateRepo.save(state);
  }

  async updateState(
    ctx: RequestContextDto,
    id: number,
    dto: UpdateStateDto,
  ): Promise<StateEntity> {
    this.logger.log(`${this.updateState.name} Service Called`);

    const state = await this.getState(ctx, id);
    this.stateRepo.merge(state, dto);

    return this.stateRepo.save(state);
  }

  async deleteState(ctx: RequestContextDto, id: number): Promise<StateEntity> {
    this.logger.log(`${this.deleteState.name} Service Called`);

    const state = await this.getState(ctx, id);

    return this.stateRepo.remove(state);
  }
}
