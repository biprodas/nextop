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
  DepartmentResponseDto,
  CreateDepartmentDto,
  FilterDepartmentDto,
  UpdateDepartmentDto,
} from '../dtos';
import { DepartmentService } from '../services/department.service';

@UseGuards(JwtAuthGuard)
@Controller('departments')
export class DepartmentController {
  private logger = new Logger(DepartmentController.name);

  constructor(private readonly departmentService: DepartmentService) {}

  @Get('/')
  async getDepartments(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterDepartmentDto,
  ): Promise<BaseApiSuccessResponse<DepartmentResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all departments. Query: ${JSON.stringify(dto)}`,
    );

    const departments = await this.departmentService.getDepartments(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of departments`,
      totalRecords: departments.length,
      data: departments,
    };
  }

  @Get('/:id')
  async getDepartment(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<DepartmentResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving department details. Id: ${id}`,
    );

    const department = await this.departmentService.getDepartment(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of department of id: ${id}`,
      data: department,
    };
  }

  @Post('/')
  async createDepartment(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateDepartmentDto,
  ): Promise<BaseApiSuccessResponse<DepartmentResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" creating new department. Data: ${JSON.stringify(dto)}`,
    );

    const department = await this.departmentService.createDepartment(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New department of id: ${department.id} created`,
      data: department,
    };
  }

  @Put('/:id')
  async updateDepartment(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDepartmentDto,
  ): Promise<BaseApiSuccessResponse<DepartmentResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a department. Id ${id}`,
    );

    const department = await this.departmentService.updateDepartment(
      ctx,
      id,
      dto,
    );

    return {
      success: true,
      statusCode: 200,
      message: `Department of id "${id}" updated`,
      data: department,
    };
  }

  @Delete('/:id')
  async deleteDepartment(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<DepartmentResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a department. Id: ${id}`,
    );

    const department = await this.departmentService.deleteDepartment(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Department of id "${id}" deleted`,
      data: department,
    };
  }
}
