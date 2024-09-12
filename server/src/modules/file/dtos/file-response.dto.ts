import { Expose } from 'class-transformer';

export class FileResponseDto {
  @Expose()
  publicKey: string;

  @Expose()
  privateKey: string;
}
