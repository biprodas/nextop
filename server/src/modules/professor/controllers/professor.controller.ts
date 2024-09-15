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
  ProfessorResponseDto,
  CreateProfessorDto,
  FilterProfessorDto,
  UpdateProfessorDto,
} from '../dtos';
import { ProfessorService } from '../services/professor.service';

@UseGuards(JwtAuthGuard)
@Controller('professors')
export class ProfessorController {
  private logger = new Logger(ProfessorController.name);

  constructor(private readonly professorService: ProfessorService) {}

  @Get('/')
  async getProfessors(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterProfessorDto,
  ): Promise<BaseApiSuccessResponse<ProfessorResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all professors. Query: ${JSON.stringify(dto)}`,
    );

    const professors = await this.professorService.getProfessors(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of professors`,
      totalRecords: professors.length,
      data: professors,
    };
  }

  @Get('/:id')
  async getProfessor(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProfessorResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving professor details. Id: ${id}`,
    );

    const professor = await this.professorService.getProfessor(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of professor of id: ${id}`,
      data: professor,
    };
  }

  @Post('/')
  async createProfessor(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateProfessorDto,
  ): Promise<BaseApiSuccessResponse<ProfessorResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new professor. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const professor = await this.professorService.createProfessor(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New professor of id: ${professor.id} created`,
      data: professor,
    };
  }

  @Put('/:id')
  async updateProfessor(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProfessorDto,
  ): Promise<BaseApiSuccessResponse<ProfessorResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a professor. Id ${id}`,
    );

    const professor = await this.professorService.updateProfessor(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Professor of id "${id}" updated`,
      data: professor,
    };
  }

  @Delete('/:id')
  async deleteProfessor(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProfessorResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a professor. Id: ${id}`,
    );

    const professor = await this.professorService.deleteProfessor(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Professor of id "${id}" deleted`,
      data: professor,
    };
  }
}
