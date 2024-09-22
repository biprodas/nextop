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
  UniversityResponseDto,
  CreateUniversityDto,
  FilterUniversityDto,
  UpdateUniversityDto,
} from '../dtos';
import { UniversityService } from '../services/university.service';

@UseGuards(JwtAuthGuard)
@Controller('universities')
export class UniversityController {
  private logger = new Logger(UniversityController.name);

  constructor(private readonly universityService: UniversityService) {}

  @Get('/')
  async getUniversities(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterUniversityDto,
  ): Promise<BaseApiSuccessResponse<UniversityResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all universities. Query: ${JSON.stringify(dto)}`,
    );

    const universities = await this.universityService.getUniversities(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of universities`,
      totalRecords: universities.length,
      data: universities,
    };
  }

  @Get('/:id')
  async getUniversity(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<UniversityResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving university details. Id: ${id}`,
    );

    const university = await this.universityService.getUniversity(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of university of id: ${id}`,
      data: university,
    };
  }

  @Post('/')
  async createUniversity(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateUniversityDto,
  ): Promise<BaseApiSuccessResponse<UniversityResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" creating new university. Data: ${JSON.stringify(dto)}`,
    );

    const university = await this.universityService.createUniversity(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New university of id: ${university.id} created`,
      data: university,
    };
  }

  @Put('/:id')
  async updateUniversity(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUniversityDto,
  ): Promise<BaseApiSuccessResponse<UniversityResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a university. Id ${id}`,
    );

    const university = await this.universityService.updateUniversity(
      ctx,
      id,
      dto,
    );

    return {
      success: true,
      statusCode: 200,
      message: `University of id "${id}" updated`,
      data: university,
    };
  }

  @Delete('/:id')
  async deleteUniversity(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<UniversityResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a university. Id: ${id}`,
    );

    const university = await this.universityService.deleteUniversity(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `University of id "${id}" deleted`,
      data: university,
    };
  }
}
