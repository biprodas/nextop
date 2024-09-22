import { S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import multerS3 from 'multer-s3';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { StorageType } from '@modules/file/enums/storage-type.enum';
import { StorageConfig } from 'src/config/config.type';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  private readonly storage: StorageConfig;

  constructor(private configService: ConfigService) {
    this.storage = this.configService.get<StorageConfig>('storage');
  }

  createMulterOptions(): MulterModuleOptions {
    // console.log('Multer Options', this.storage);

    // AWS S3
    if (this.storage.type === StorageType.S3) {
      const s3Client = new S3Client({
        // forcePathStyle: false,
        // apiVersion: storage.s3.apiVersion,
        region: this.storage.s3.region,
        credentials: {
          accessKeyId: this.storage.s3.accessKeyId,
          secretAccessKey: this.storage.s3.secretAccessKey,
        },
      });

      return {
        storage: multerS3({
          contentType: multerS3.AUTO_CONTENT_TYPE,
          s3: s3Client,
          bucket: this.storage.s3.bucket,
          key: function (_, file, cb) {
            cb(null, `${uuidv4()}${file.originalname}`);
          },
        }),
      };
    }

    // We can define other cloud storage here...

    // Local Storage
    return {
      storage: diskStorage({
        // Specify the directory where files will be stored
        destination: this.storage.local.uploadPath ?? 'public/uploads',
        // Define a unique filename
        filename: (_req, file, callback) => {
          const filename =
            file.fieldname + '-' + uuidv4() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
    };
  }
}
