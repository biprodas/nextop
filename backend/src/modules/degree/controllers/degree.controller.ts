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
  DegreeResponseDto,
  CreateDegreeDto,
  FilterDegreeDto,
  UpdateDegreeDto,
} from '../dtos';
import { DegreeService } from '../services/degree.service';

@UseGuards(JwtAuthGuard)
@Controller('degrees')
export class DegreeController {
  private logger = new Logger(DegreeController.name);

  constructor(private readonly degreeService: DegreeService) {}

  @Get('/')
  async getDegrees(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterDegreeDto,
  ): Promise<BaseApiSuccessResponse<DegreeResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving all degrees. Query: ${JSON.stringify(
        dto,
      )}`,
    );

    const degrees = await this.degreeService.getDegrees(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of degrees`,
      totalRecords: degrees.length,
      data: degrees,
    };
  }

  @Get('/:id')
  async getDegree(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<DegreeResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving degree details. Id: ${id}`,
    );

    const degree = await this.degreeService.getDegree(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of degree of id: ${id}`,
      data: degree,
    };
  }

  @Post('/')
  async createDegree(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateDegreeDto,
  ): Promise<BaseApiSuccessResponse<DegreeResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new degree. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const degree = await this.degreeService.createDegree(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New degree of id: ${degree.id} created`,
      data: degree,
    };
  }

  @Put('/:id')
  async updateDegree(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateDegreeDto,
  ): Promise<BaseApiSuccessResponse<DegreeResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a degree. Id ${id}`,
    );

    const degree = await this.degreeService.updateDegree(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Degree of id "${id}" updated`,
      data: degree,
    };
  }

  @Delete('/:id')
  async deleteDegree(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<DegreeResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a degree. Id: ${id}`,
    );

    const degree = await this.degreeService.deleteDegree(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Degree of id "${id}" deleted`,
      data: degree,
    };
  }
}
