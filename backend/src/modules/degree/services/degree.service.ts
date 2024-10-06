import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateDegreeDto, FilterDegreeDto, UpdateDegreeDto } from '../dtos';
import { DegreeEntity } from '../entities/degree.entity';

@Injectable()
export class DegreeService {
  private logger = new Logger(DegreeService.name);

  constructor(
    @InjectRepository(DegreeEntity)
    private readonly degreeRepo: Repository<DegreeEntity>,
  ) {}

  getDegrees(
    _ctx: RequestContextDto,
    dto: FilterDegreeDto,
  ): Promise<DegreeEntity[]> {
    this.logger.log(`${this.getDegrees.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.degreeRepo.find({ where: reqQuery });
  }

  async getDegree(_ctx: RequestContextDto, id: string): Promise<DegreeEntity> {
    this.logger.log(`${this.getDegree.name} Service Called`);

    const degree = await this.degreeRepo.findOne({ where: { id } });
    if (!degree) {
      throw new NotFoundException(`Degree of id ${id} not found.`);
    }

    return degree;
  }

  async createDegree(
    _ctx: RequestContextDto,
    dto: CreateDegreeDto,
  ): Promise<DegreeEntity> {
    this.logger.log(`${this.createDegree.name} Service Called`);

    const degree = this.degreeRepo.create(dto);

    return this.degreeRepo.save(degree);
  }

  async updateDegree(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateDegreeDto,
  ): Promise<DegreeEntity> {
    this.logger.log(`${this.updateDegree.name} Service Called`);

    const degree = await this.getDegree(ctx, id);
    this.degreeRepo.merge(degree, dto);

    return this.degreeRepo.save(degree);
  }

  async deleteDegree(
    ctx: RequestContextDto,
    id: string,
  ): Promise<DegreeEntity> {
    this.logger.log(`${this.deleteDegree.name} Service Called`);

    const degree = await this.getDegree(ctx, id);

    return this.degreeRepo.remove(degree);
  }
}
