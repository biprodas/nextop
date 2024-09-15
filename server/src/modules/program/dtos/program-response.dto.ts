import { Expose } from 'class-transformer';

export class ProgramResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}
