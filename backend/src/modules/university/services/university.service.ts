import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateUniversityDto,
  FilterUniversityDto,
  UpdateUniversityDto,
} from '../dtos';
import { UniversityEntity } from '../entities/university.entity';

@Injectable()
export class UniversityService {
  private logger = new Logger(UniversityService.name);

  constructor(
    @InjectRepository(UniversityEntity)
    private readonly universityRepo: Repository<UniversityEntity>,
  ) {}

  getUniversities(
    _ctx: RequestContextDto,
    dto: FilterUniversityDto,
  ): Promise<UniversityEntity[]> {
    this.logger.log(`${this.getUniversities.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.universityRepo.find({ where: reqQuery });
  }

  async getUniversity(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<UniversityEntity> {
    this.logger.log(`${this.getUniversity.name} Service Called`);

    const university = await this.universityRepo.findOne({ where: { id } });
    if (!university) {
      throw new NotFoundException(`University of id ${id} not found.`);
    }

    return university;
  }

  async createUniversity(
    _ctx: RequestContextDto,
    dto: CreateUniversityDto,
  ): Promise<UniversityEntity> {
    this.logger.log(`${this.createUniversity.name} Service Called`);

    const university = this.universityRepo.create(dto);

    return this.universityRepo.save(university);
  }

  async updateUniversity(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateUniversityDto,
  ): Promise<UniversityEntity> {
    this.logger.log(`${this.updateUniversity.name} Service Called`);

    const university = await this.getUniversity(ctx, id);
    this.universityRepo.merge(university, dto);

    return this.universityRepo.save(university);
  }

  async deleteUniversity(
    ctx: RequestContextDto,
    id: string,
  ): Promise<UniversityEntity> {
    this.logger.log(`${this.deleteUniversity.name} Service Called`);

    const university = await this.getUniversity(ctx, id);

    return this.universityRepo.remove(university);
  }
}
