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
} from '@nestjs/common';
import { DictionaryService } from '../services/dictionary.service';
import { FilterDictionaryDto } from '../dtos/filter-dictionary.dto';
import { CreateDictionaryDto } from '../dtos/create-dictionary.dto';
import { UpdateDictionaryDto } from '../dtos/update-dictionary.dto';

// Dictionarybook
@Controller({ path: 'Dictionarys', version: '1' })
export class DictionaryController {
  private logger = new Logger(DictionaryController.name);

  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('/')
  async getAll(@Query() filterDictionaryDto: FilterDictionaryDto) {
    this.logger.verbose(`User "unknown" retieving all Dictionarys`);

    const results = await this.dictionaryService.getAll(filterDictionaryDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of Dictionarys`,
      data: results,
    };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.verbose(`User "unknown" retieving Dictionary of id: ${id}`);

    const result = await this.dictionaryService.getOne(id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of Dictionary of id: ${id}`,
      data: result,
    };
  }

  @Post('/')
  async create(@Body() createDictionaryDto: CreateDictionaryDto) {
    this.logger.verbose(`User "unknown" creating new Dictionary`);

    const result = await this.dictionaryService.create(createDictionaryDto);

    return {
      success: true,
      statusCode: 201,
      message: `New Dictionary "${result.title}" created`,
      data: result,
    };
  }

  @Put('/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ) {
    this.logger.verbose(`User "unknown" updating Dictionary of id: ${id}`);

    const result = await this.dictionaryService.update(id, updateDictionaryDto);

    return {
      success: true,
      statusCode: 201,
      message: `Dictionary "${result.title}" updated`,
      data: result,
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.verbose(`User "unknown" deleting Dictionary of id: ${id}`);

    const result = await this.dictionaryService.delete(id);

    return {
      success: true,
      statusCode: 201,
      message: `Dictionary "${result.title}" deleted`,
      data: result,
    };
  }
}
