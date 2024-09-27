import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
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
  StateResponseDto,
  CreateStateDto,
  FilterStateDto,
  UpdateStateDto,
} from '../dtos';
import { StateService } from '../services/state.service';

@UseGuards(JwtAuthGuard)
@Controller('states')
export class StateController {
  private logger = new Logger(StateController.name);

  constructor(private readonly stateService: StateService) {}

  @Get('/')
  async getStates(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterStateDto,
  ): Promise<BaseApiSuccessResponse<StateResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving all states. Query: ${JSON.stringify(
        dto,
      )}`,
    );

    const states = await this.stateService.getStates(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of states`,
      totalRecords: states.length,
      data: states,
    };
  }

  @Get('/:id')
  async getState(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<StateResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving state details. Id: ${id}`,
    );

    const state = await this.stateService.getState(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of state of id: ${id}`,
      data: state,
    };
  }

  @Post('/')
  async createState(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateStateDto,
  ): Promise<BaseApiSuccessResponse<StateResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new state. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const state = await this.stateService.createState(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New state of id: ${state.id} created`,
      data: state,
    };
  }

  @Put('/:id')
  async updateState(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateStateDto,
  ): Promise<BaseApiSuccessResponse<StateResponseDto>> {
    this.logger.verbose(`User "${ctx.user?.email}" updating a state. Id ${id}`);

    const state = await this.stateService.updateState(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `State of id "${id}" updated`,
      data: state,
    };
  }

  @Delete('/:id')
  async deleteState(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<StateResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a state. Id: ${id}`,
    );

    const state = await this.stateService.deleteState(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `State of id "${id}" deleted`,
      data: state,
    };
  }
}
