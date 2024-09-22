import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Dictionary {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  isPrivate: boolean;
}

export type DictionaryDocument = HydratedDocument<Dictionary>;
export const DictionarySchema = SchemaFactory.createForClass(Dictionary);

// DictionarySchema.index({ documentId: 1 }, { unique: true });
