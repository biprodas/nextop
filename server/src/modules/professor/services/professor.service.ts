import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateProfessorDto,
  FilterProfessorDto,
  UpdateProfessorDto,
} from '../dtos';
import { ProfessorEntity } from '../entities/professor.entity';

@Injectable()
export class ProfessorService {
  private logger = new Logger(ProfessorService.name);

  constructor(
    @InjectRepository(ProfessorEntity)
    private readonly professorRepo: Repository<ProfessorEntity>,
  ) {}

  getProfessors(
    _ctx: RequestContextDto,
    dto: FilterProfessorDto,
  ): Promise<ProfessorEntity[]> {
    this.logger.log(`${this.getProfessors.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.professorRepo.find({ where: reqQuery });
  }

  async getProfessor(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<ProfessorEntity> {
    this.logger.log(`${this.getProfessor.name} Service Called`);

    const professor = await this.professorRepo.findOne({ where: { id } });
    if (!professor) {
      throw new NotFoundException(`Professor of id ${id} not found.`);
    }

    return professor;
  }

  async createProfessor(
    _ctx: RequestContextDto,
    dto: CreateProfessorDto,
  ): Promise<ProfessorEntity> {
    this.logger.log(`${this.createProfessor.name} Service Called`);

    const professor = this.professorRepo.create(dto);

    return this.professorRepo.save(professor);
  }

  async updateProfessor(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateProfessorDto,
  ): Promise<ProfessorEntity> {
    this.logger.log(`${this.updateProfessor.name} Service Called`);

    const professor = await this.getProfessor(ctx, id);
    this.professorRepo.merge(professor, dto);

    return this.professorRepo.save(professor);
  }

  async deleteProfessor(
    ctx: RequestContextDto,
    id: string,
  ): Promise<ProfessorEntity> {
    this.logger.log(`${this.deleteProfessor.name} Service Called`);

    const professor = await this.getProfessor(ctx, id);

    return this.professorRepo.remove(professor);
  }
}
