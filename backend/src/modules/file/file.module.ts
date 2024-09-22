import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './controllers/file.controller';
import { FileService } from './services/file.service';
import { FileEntity } from './entities/file.entity';
import { AwsS3Service } from './services/aws-s3.service';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './services/multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [FileController],
  providers: [FileService, AwsS3Service, MulterConfigService],
  exports: [FileService],
})
export class FileModule {}
