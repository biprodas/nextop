import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LangOpt } from '../schemas/dictionary.schema';

export class CreateWordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  word: string;

  @IsString()
  @IsOptional()
  details: string;

  @IsString()
  @IsOptional()
  pronounce: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  partOfSpeech: [string];

  @IsArray()
  @ArrayNotEmpty({ each: true })
  @IsOptional()
  definition: LangOpt[];

  @IsArray()
  @ArrayNotEmpty({ each: true })
  @IsOptional()
  examples: LangOpt[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  mnemonics: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  audios: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  videos: string[];

  @IsNumber()
  @IsOptional()
  level: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  @IsBoolean()
  @IsOptional()
  isKnown: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  synonyms: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  antonyms: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  similarWords: string[];
}
