import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary } from '../schemas/dictionary.schema';
import { FilterWordDto } from '../dtos/filter-word.dto';
import { UpdateWordDto } from '../dtos/update-word.dto';

@Injectable()
export class DictionaryService {
  constructor(@InjectModel(Dictionary.name) private dictionaryModel: Model<Dictionary>) {}

  async getAll(filterWordDto: FilterWordDto): Promise<Dictionary[]> {
    console.log(filterWordDto);
    return this.dictionaryModel.find().exec();
  }

  async getOne(id: string): Promise<Dictionary> {
    return this.dictionaryModel.findById(id).exec();
  }

  async findOne(filterWordDto: FilterWordDto): Promise<Dictionary> {
    const { word } = filterWordDto;
    return this.dictionaryModel.findOne({ word }).exec();
  }

  async create(createWordDto: FilterWordDto): Promise<Dictionary> {
    console.log(createWordDto);
    // through error for duplicate word
    return this.dictionaryModel.create(createWordDto);
  }

  async update(id: string, updateWordDto: UpdateWordDto): Promise<Dictionary> {
    return this.dictionaryModel.findByIdAndUpdate(id, updateWordDto).exec();
  }

  delete(id: string): Promise<Dictionary> {
    return this.dictionaryModel.findByIdAndRemove(id).exec();
  }
}
