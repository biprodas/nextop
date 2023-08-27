import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DictionaryService } from '../services/dictionary.service';
import { FilterWordDto } from '../dtos/filter-word.dto';
import { CreateWordDto } from '../dtos/create-word.dto';
import { UpdateWordDto } from '../dtos/update-word.dto';

// wordbook
@Controller({ path: 'dictionaries', version: '1' })
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get('/')
  async getAll(@Query() filterWordDto: FilterWordDto) {
    const results = await this.dictionaryService.getAll(filterWordDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of words`,
      data: results,
    };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.dictionaryService.getOne(id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of word of id: ${id}`,
      data: result,
    };
  }

  @Post('/')
  async create(@Body() createWordDto: CreateWordDto) {
    const result = await this.dictionaryService.create(createWordDto);

    return {
      success: true,
      statusCode: 201,
      message: `New word "${result.word}" created`,
      data: result,
    };
  }

  @Put('/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateWordDto: UpdateWordDto) {
    const result = await this.dictionaryService.update(id, updateWordDto);

    return {
      success: true,
      statusCode: 201,
      message: `Word "${result.word}" updated`,
      data: result,
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    const result = await this.dictionaryService.delete(id);

    return {
      success: true,
      statusCode: 201,
      message: `Word "${result.word}" deleted`,
      data: result,
    };
  }
}
