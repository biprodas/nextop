import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dictionary, DictionarySchema } from './schemas/dictionary.schema';
import { DictionaryController } from './controllers/dictionary.controller';
import { DictionaryService } from './services/dictionary.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dictionary.name, schema: DictionarySchema }])],
  controllers: [DictionaryController],
  providers: [DictionaryService],
  exports: [],
})
export class DictionaryModule {}
