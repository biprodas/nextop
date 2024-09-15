import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateDepartmentDto,
  FilterDepartmentDto,
  UpdateDepartmentDto,
} from '../dtos';
import { DepartmentEntity } from '../entities/department.entity';

@Injectable()
export class DepartmentService {
  private logger = new Logger(DepartmentService.name);

  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepo: Repository<DepartmentEntity>,
  ) {}

  getDepartments(
    _ctx: RequestContextDto,
    dto: FilterDepartmentDto,
  ): Promise<DepartmentEntity[]> {
    this.logger.log(`${this.getDepartments.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.departmentRepo.find({ where: reqQuery });
  }

  async getDepartment(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<DepartmentEntity> {
    this.logger.log(`${this.getDepartment.name} Service Called`);

    const department = await this.departmentRepo.findOne({ where: { id } });
    if (!department) {
      throw new NotFoundException(`Department of id ${id} not found.`);
    }

    return department;
  }

  async createDepartment(
    _ctx: RequestContextDto,
    dto: CreateDepartmentDto,
  ): Promise<DepartmentEntity> {
    this.logger.log(`${this.createDepartment.name} Service Called`);

    const department = this.departmentRepo.create(dto);

    return this.departmentRepo.save(department);
  }

  async updateDepartment(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateDepartmentDto,
  ): Promise<DepartmentEntity> {
    this.logger.log(`${this.updateDepartment.name} Service Called`);

    const department = await this.getDepartment(ctx, id);
    this.departmentRepo.merge(department, dto);

    return this.departmentRepo.save(department);
  }

  async deleteDepartment(
    ctx: RequestContextDto,
    id: string,
  ): Promise<DepartmentEntity> {
    this.logger.log(`${this.deleteDepartment.name} Service Called`);

    const department = await this.getDepartment(ctx, id);

    return this.departmentRepo.remove(department);
  }
}
