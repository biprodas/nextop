import { Expose } from 'class-transformer';
import { LangOpt } from '../schemas/word.schema';

export class WordDto {
  @Expose()
  id: string;

  @Expose()
  word: string;

  @Expose()
  details: string;

  @Expose()
  pronounce: string;

  @Expose()
  partOfSpeech: [string];

  @Expose()
  definition: LangOpt[];

  @Expose()
  examples: LangOpt[];

  @Expose()
  mnemonics: string[];

  @Expose()
  audios: string[];

  @Expose()
  videos: string[];

  @Expose()
  level: number;

  @Expose()
  tags: string[];

  @Expose()
  isFavorite: boolean;

  @Expose()
  isKnown: boolean;

  @Expose()
  synonyms: string[];

  @Expose()
  antonyms: string[];

  @Expose()
  similarWords: string[];
}
