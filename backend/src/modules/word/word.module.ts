import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Word, WordSchema } from './schemas/word.schema';
import { WordController } from './controllers/word.controller';
import { WordService } from './services/word.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Word.name, schema: WordSchema }])],
  controllers: [WordController],
  providers: [WordService],
  exports: [],
})
export class WordModule {}
