import { Expose } from 'class-transformer';

export class DictionaryDto {
  @Expose()
  id: string;

  @Expose()
  title: string;
}
