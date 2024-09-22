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
  ProgramResponseDto,
  CreateProgramDto,
  FilterProgramDto,
  UpdateProgramDto,
} from '../dtos';
import { ProgramService } from '../services/program.service';

@UseGuards(JwtAuthGuard)
@Controller('programs')
export class ProgramController {
  private logger = new Logger(ProgramController.name);

  constructor(private readonly programService: ProgramService) {}

  @Get('/')
  async getPrograms(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterProgramDto,
  ): Promise<BaseApiSuccessResponse<ProgramResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all programs. Query: ${JSON.stringify(dto)}`,
    );

    const programs = await this.programService.getPrograms(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of programs`,
      totalRecords: programs.length,
      data: programs,
    };
  }

  @Get('/:id')
  async getProgram(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProgramResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving program details. Id: ${id}`,
    );

    const program = await this.programService.getProgram(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of program of id: ${id}`,
      data: program,
    };
  }

  @Post('/')
  async createProgram(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateProgramDto,
  ): Promise<BaseApiSuccessResponse<ProgramResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new program. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const program = await this.programService.createProgram(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New program of id: ${program.id} created`,
      data: program,
    };
  }

  @Put('/:id')
  async updateProgram(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateProgramDto,
  ): Promise<BaseApiSuccessResponse<ProgramResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a program. Id ${id}`,
    );

    const program = await this.programService.updateProgram(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Program of id "${id}" updated`,
      data: program,
    };
  }

  @Delete('/:id')
  async deleteProgram(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<ProgramResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a program. Id: ${id}`,
    );

    const program = await this.programService.deleteProgram(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Program of id "${id}" deleted`,
      data: program,
    };
  }
}
