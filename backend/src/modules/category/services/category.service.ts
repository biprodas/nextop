import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RequestContextDto } from '@common/dtos/request-context.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from '../dtos';
import { CategoryEntity } from '../entities/category.entity';

@Injectable()
export class CategoryService {
  private logger = new Logger(CategoryService.name);

  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}

  getCategories(
    _ctx: RequestContextDto,
    dto: FilterCategoryDto,
  ): Promise<CategoryEntity[]> {
    this.logger.log(`${this.getCategories.name} Service Called`);

    const { name } = dto;

    const reqQuery: any = {};
    if (name) reqQuery.name = name;

    return this.categoryRepo.find({ where: reqQuery });
  }

  async getCategory(
    _ctx: RequestContextDto,
    id: string,
  ): Promise<CategoryEntity> {
    this.logger.log(`${this.getCategory.name} Service Called`);

    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category of id ${id} not found.`);
    }

    return category;
  }

  async createCategory(
    _ctx: RequestContextDto,
    dto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    this.logger.log(`${this.createCategory.name} Service Called`);

    const category = this.categoryRepo.create(dto);

    return this.categoryRepo.save(category);
  }

  async updateCategory(
    ctx: RequestContextDto,
    id: string,
    dto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    this.logger.log(`${this.updateCategory.name} Service Called`);

    const category = await this.getCategory(ctx, id);
    this.categoryRepo.merge(category, dto);

    return this.categoryRepo.save(category);
  }

  async deleteCategory(
    ctx: RequestContextDto,
    id: string,
  ): Promise<CategoryEntity> {
    this.logger.log(`${this.deleteCategory.name} Service Called`);

    const category = await this.getCategory(ctx, id);

    return this.categoryRepo.remove(category);
  }
}
