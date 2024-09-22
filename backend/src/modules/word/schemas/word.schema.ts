import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LangOpt = {
  en: string;
  bn: string;
};

@Schema({ timestamps: true })
export class Word {
  @Prop({ required: true })
  word: string;

  // dictionaryId

  @Prop()
  slug: string;

  @Prop()
  details: string;

  // [{ opt: 'en'; text: '', audio: ''; video: '' }];
  @Prop()
  pronounce: string;

  @Prop()
  partOfSpeech: [string];

  @Prop({ type: [{ en: String, bn: String }] })
  definition: LangOpt[];

  @Prop({ type: [{ en: String, bn: String }] })
  examples: LangOpt[];

  @Prop([String])
  mnemonics: string[];

  @Prop([String])
  audios: string[];

  @Prop([String])
  videos: string[];

  @Prop()
  level: number;

  @Prop([String])
  tags: string[];

  @Prop()
  isFavorite: boolean;

  @Prop()
  isKnown: boolean;

  @Prop([String])
  synonyms: string[];

  @Prop([String])
  antonyms: string[];

  @Prop([String])
  similarWords: string[];
}

export type WordDocument = HydratedDocument<Word>;
export const WordSchema = SchemaFactory.createForClass(Word);

// WordSchema.index({ documentId: 1 }, { unique: true });
