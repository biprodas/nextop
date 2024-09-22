import {
  S3Client,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { StorageConfig } from 'src/config/config.type';
import { Readable } from 'stream';

@Injectable()
export class AwsS3Service {
  private s3: S3Client;
  private bucket: string;

  constructor(private readonly configService: ConfigService) {
    const storage = this.configService.get<StorageConfig>('storage');
    this.bucket = storage.s3.bucket;
    this.s3 = new S3Client({
      region: storage.s3.region,
      credentials: {
        accessKeyId: storage.s3.accessKeyId,
        secretAccessKey: storage.s3.secretAccessKey,
      },
    });
  }

  async getFile(
    fileKey: string,
  ): Promise<{ stream: Readable; contentType: string }> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucket,
        Key: fileKey,
      });

      const response = await this.s3.send(command);

      return {
        stream: response.Body as Readable,
        contentType: response.ContentType || 'application/octet-stream',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving file from S3');
    }
  }

  async deleteFile(fileKey: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucket,
      Key: fileKey,
    });
    const result = await this.s3.send(command);

    return result;
  }
}
