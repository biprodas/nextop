import { JwtAuthGuard } from '@admin/auth/guards';
import { RequestContext } from '@common/decorators/request-context.decorator';
import { BaseApiSuccessResponse } from '@common/dtos/base-api-response.dto';
import { RequestContextDto } from '@common/dtos/request-context.dto';
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
import { LogDto } from '../dtos';
import { CreateLogDto } from '../dtos/create-log.dto';
import { FilterLogDto } from '../dtos/filter-log.dto';
import { UpdateLogDto } from '../dtos/update-log.dto';
import { LogService } from '../services/log.service';

@UseGuards(JwtAuthGuard)
@Controller('logs')
export class LogController {
  private logger = new Logger(LogController.name);

  constructor(private logService: LogService) {}

  @Get('/')
  async getLogs(
    @RequestContext() ctx: RequestContextDto,
    @Query() filterLogDto: FilterLogDto,
  ): Promise<BaseApiSuccessResponse<LogDto[]>> {
    this.logger.verbose(`User "${ctx.user?.email}" retieving all Logs`);

    const logs = await this.logService.getLogs(ctx, filterLogDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of logs`,
      totalRecords: logs.length,
      data: logs,
    };
  }

  @Get('/:id')
  async getLog(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<LogDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" retieving Log. #ID: ${id}`);

    const log = await this.logService.getLog(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of log of id: ${id}`,
      data: log,
    };
  }

  @Post('/')
  async createLog(
    @RequestContext() ctx: RequestContextDto,
    @Body() createLogDto: CreateLogDto,
  ): Promise<BaseApiSuccessResponse<LogDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" creating a Log`);

    const log = await this.logService.createLog(ctx, createLogDto);

    return {
      success: true,
      statusCode: 201,
      message: `New Log of id: ${log.id} created`,
      data: log,
    };
  }

  @Put('/:id')
  async updateLog(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLogDto: UpdateLogDto,
  ): Promise<BaseApiSuccessResponse<LogDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating Log. #ID: ${id}`);

    const log = await this.logService.updateLog(ctx, id, updateLogDto);

    return {
      success: true,
      statusCode: 200,
      message: `Log of id ${id} updated`,
      data: log,
    };
  }

  @Delete('/:id')
  async deleteLog(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<LogDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" deleting a Log. #ID: ${id}`);

    const log = await this.logService.deleteLog(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Log of id ${id} deleted`,
      data: log,
    };
  }
}
