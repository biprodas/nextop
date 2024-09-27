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
  CountryResponseDto,
  CreateCountryDto,
  FilterCountryDto,
  UpdateCountryDto,
} from '../dtos';
import { CountryService } from '../services/country.service';

@UseGuards(JwtAuthGuard)
@Controller('countries')
export class CountryController {
  private logger = new Logger(CountryController.name);

  constructor(private readonly countryService: CountryService) {}

  @Get('/')
  async getCountries(
    @RequestContext() ctx: RequestContextDto,
    @Query() dto: FilterCountryDto,
  ): Promise<BaseApiSuccessResponse<CountryResponseDto[]>> {
    this.logger.verbose(
      `User "${ctx.user
        ?.email}" retieving all countries. Query: ${JSON.stringify(dto)}`,
    );

    const countries = await this.countryService.getCountries(ctx, dto);

    return {
      success: true,
      statusCode: 200,
      message: `List of countries`,
      totalRecords: countries.length,
      data: countries,
    };
  }

  @Get('/:id')
  async getCountry(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CountryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" retieving country details. Id: ${id}`,
    );

    const country = await this.countryService.getCountry(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of country of id: ${id}`,
      data: country,
    };
  }

  @Post('/')
  async createCountry(
    @RequestContext() ctx: RequestContextDto,
    @Body() dto: CreateCountryDto,
  ): Promise<BaseApiSuccessResponse<CountryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" creating new country. Data: ${JSON.stringify(
        dto,
      )}`,
    );

    const country = await this.countryService.createCountry(ctx, dto);

    return {
      success: true,
      statusCode: 201,
      message: `New country of id: ${country.id} created`,
      data: country,
    };
  }

  @Put('/:id')
  async updateCountry(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCountryDto,
  ): Promise<BaseApiSuccessResponse<CountryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" updating a country. Id ${id}`,
    );

    const country = await this.countryService.updateCountry(ctx, id, dto);

    return {
      success: true,
      statusCode: 200,
      message: `Country of id "${id}" updated`,
      data: country,
    };
  }

  @Delete('/:id')
  async deleteCountry(
    @RequestContext() ctx: RequestContextDto,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BaseApiSuccessResponse<CountryResponseDto>> {
    this.logger.verbose(
      `User "${ctx.user?.email}" deleting a country. Id: ${id}`,
    );

    const country = await this.countryService.deleteCountry(ctx, id);

    return {
      success: true,
      statusCode: 200,
      message: `Country of id "${id}" deleted`,
      data: country,
    };
  }
}
