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
import { WordService } from '../services/word.service';
import { FilterWordDto } from '../dtos/filter-word.dto';
import { CreateWordDto } from '../dtos/create-word.dto';
import { UpdateWordDto } from '../dtos/update-word.dto';
import { ParseObjectIdPipe } from '@common/pipes/parse-object-id.pipe';
import { ObjectId } from 'mongoose';

@Controller({ path: 'words', version: '1' })
export class WordController {
  private logger = new Logger(WordController.name);

  constructor(private readonly wordService: WordService) {}

  @Get('/')
  async getAll(@Query() filterWordDto: FilterWordDto) {
    this.logger.verbose(`User "unknown" retieving all words`);

    const results = await this.wordService.getAll(filterWordDto);

    return {
      success: true,
      statusCode: 200,
      message: `List of words`,
      data: results,
    };
  }

  @Get('/:id')
  async getOne(@Param('id', ParseObjectIdPipe) id: ObjectId) {
    this.logger.verbose(`User "unknown" retieving word of id: ${id}`);

    const result = await this.wordService.getOne(id);

    return {
      success: true,
      statusCode: 200,
      message: `Details of word of id: ${id}`,
      data: result,
    };
  }

  @Post('/')
  async create(@Body() createWordDto: CreateWordDto) {
    this.logger.verbose(`User "unknown" creating new word`);

    const result = await this.wordService.create(createWordDto);

    return {
      success: true,
      statusCode: 201,
      message: `New word "${result.word}" created`,
      data: result,
    };
  }

  @Put('/:id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateWordDto: UpdateWordDto) {
    this.logger.verbose(`User "unknown" updating word of id: ${id}`);

    const result = await this.wordService.update(id, updateWordDto);

    return {
      success: true,
      statusCode: 201,
      message: `Word "${result.word}" updated`,
      data: result,
    };
  }

  @Delete('/:id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    this.logger.verbose(`User "unknown" deleting word of id: ${id}`);

    const result = await this.wordService.delete(id);

    return {
      success: true,
      statusCode: 201,
      message: `Word "${result.word}" deleted`,
      data: result,
    };
  }
}
