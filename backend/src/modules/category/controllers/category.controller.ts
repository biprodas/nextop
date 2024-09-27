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

import { JwtAuthGuard } from '@admin/auth/guards';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
import {
  CategoryResponseDto,
  CreateCategoryDto,
  FilterCategoryDto,
  UpdateCategoryDto,
} from '../dtos';
import { CategoryService } from '../services/category.service';

@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
  private logger = new Logger(CategoryController.name);

  constructor(private readonly categoryService: CategoryService) {}

  @Get('/')
  async getCategories(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterCategoryDto,
  ): Promise<BaseApiSuccessResponse<CategoryResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all categories. Query: ${JSON.stringify(dto)}`,
    );

    const categories = await this.categoryService.getCategories(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of categories`,
      totalRecords: categories.length,
      data: categories,
    };
  }

  @Get('/:id')
  async getCategory(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CategoryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving category details. Id: ${id}`,
    );

    const category = await this.categoryService.getCategory(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of category of id: ${id}`,
      data: category,
    };
  }

  @Post('/')
  async createCategory(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateCategoryDto,
  ): Promise<BaseApiSuccessResponse<CategoryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new category. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const category = await this.categoryService.createCategory(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New category of id: ${category.id} created`,
      data: category,
    };
  }

  @Put('/:id')
  async updateCategory(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCategoryDto,
  ): Promise<BaseApiSuccessResponse<CategoryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a category. Id ${id}`,
    );

    const category = await this.categoryService.updateCategory(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Category of id "${id}" updated`,
      data: category,
    };
  }

  @Delete('/:id')
  async deleteCategory(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CategoryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a category. Id: ${id}`,
    );

    const category = await this.categoryService.deleteCategory(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Category of id "${id}" deleted`,
      data: category,
    };
  }
}
