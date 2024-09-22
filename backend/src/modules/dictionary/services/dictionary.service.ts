import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dictionary } from '../schemas/dictionary.schema';
import { FilterDictionaryDto } from '../dtos/filter-dictionary.dto';
import { UpdateDictionaryDto } from '../dtos/update-dictionary.dto';

@Injectable()
export class DictionaryService {
  constructor(@InjectModel(Dictionary.name) private dictionaryModel: Model<Dictionary>) {}

  async getAll(filterDictionaryDto: FilterDictionaryDto): Promise<Dictionary[]> {
    console.log(filterDictionaryDto);
    return this.dictionaryModel.find().exec();
  }

  async getOne(id: string): Promise<Dictionary> {
    return this.dictionaryModel.findById(id).exec();
  }

  async findOne(filterDictionaryDto: FilterDictionaryDto): Promise<Dictionary> {
    const { title } = filterDictionaryDto;
    return this.dictionaryModel.findOne({ title }).exec();
  }

  async create(createDictionaryDto: FilterDictionaryDto): Promise<Dictionary> {
    console.log(createDictionaryDto);
    return this.dictionaryModel.create(createDictionaryDto);
  }

  async update(id: string, updateDictionaryDto: UpdateDictionaryDto): Promise<Dictionary> {
    return this.dictionaryModel.findByIdAndUpdate(id, updateDictionaryDto).exec();
  }

  delete(id: string): Promise<Dictionary> {
    return this.dictionaryModel.findByIdAndRemove(id).exec();
  }
}
