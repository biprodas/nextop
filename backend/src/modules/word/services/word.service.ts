import { Model, ObjectId } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Word } from '../schemas/word.schema';
import { FilterWordDto } from '../dtos/filter-word.dto';
import { UpdateWordDto } from '../dtos/update-word.dto';

@Injectable()
export class WordService {
  constructor(@InjectModel(Word.name) private wordModel: Model<Word>) {}

  async getAll(filterWordDto: FilterWordDto): Promise<Word[]> {
    console.log(filterWordDto);
    return this.wordModel.find();
  }

  async getOne(id: ObjectId): Promise<Word> {
    return this.wordModel.findById(id);
  }

  async findOne(filterWordDto: FilterWordDto): Promise<Word> {
    const { word } = filterWordDto;
    return this.wordModel.findOne({ word });
  }

  async create(createWordDto: FilterWordDto): Promise<Word> {
    console.log(createWordDto);
    // through error for duplicate word
    return this.wordModel.create(createWordDto);
  }

  async update(id: string, updateWordDto: UpdateWordDto): Promise<Word> {
    return this.wordModel.findByIdAndUpdate(id, updateWordDto);
  }

  delete(id: string): Promise<Word> {
    return this.wordModel.findByIdAndRemove(id);
  }
}
