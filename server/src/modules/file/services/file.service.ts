import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { subDays } from 'date-fns';
import fs from 'fs';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { AppConfig, StorageConfig } from 'src/config/config.type';
import { CreateFileDto } from '../dtos/create-file.dto';
import { FilterFileDto } from '../dtos/filter-file.dto';
import { FileEntity } from '../entities/file.entity';
import { StorageType } from '../enums/storage-type.enum';
import { IFile, S3File } from '../interfaces/file.interface';
import { AwsS3Service } from './aws-s3.service';

@Injectable()
export class FileService {
  private logger = new Logger(FileService.name);

  constructor(
    @InjectRepository(FileEntity)
    private fileRepo: Repository<FileEntity>,
    private readonly s3Service: AwsS3Service,
    private readonly configService: ConfigService,
  ) {}

  async getFiles(filterFileDto: FilterFileDto): Promise<FileEntity[]> {
    const { storageType, cutoffDate } = filterFileDto;

    const qb = this.fileRepo.createQueryBuilder('file');

    if (storageType) qb.where({ storageType });
    if (cutoffDate) qb.where('file.modifiedAt < :cutoffDate', { cutoffDate });

    const results = await qb.getMany();

    return results;
  }

  async getFile(publicKey: string): Promise<FileEntity> {
    const file = await this.fileRepo.findOne({
      where: { publicKey },
    });

    if (!file) {
      throw new NotFoundException(`File not found.`);
    }

    file.modifiedAt = new Date();
    await this.fileRepo.save(file);

    return file;
  }

  async createFile(file: IFile | S3File): Promise<FileEntity> {
    this.logger.log('🚀 ~ FileService ~ file:', file);
    const storage = this.configService.get<StorageConfig>('storage');

    const newFile = this.fileRepo.create({
      storageType: storage.type,
      publicKey: uuidv4(),
      privateKey: uuidv4(),
      fieldname: file.fieldname,
      originalname: file.originalname,
      encoding: file.encoding,
      mimetype: file.mimetype,
      size: file.size,
      //
      destination: file.destination,
      filename: file.filename,
      path: file.path,
    } as CreateFileDto);

    if (storage.type === StorageType.S3) {
      newFile.destination = (file as S3File).bucket;
      newFile.filename = (file as S3File).key;
      newFile.path = (file as S3File).location;
    }

    return this.fileRepo.save(newFile);
  }

  async deleteFile(privateKey: string): Promise<FileEntity> {
    const file = await this.fileRepo.findOne({
      where: { privateKey },
    });

    if (!file) {
      throw new NotFoundException(`File not found.`);
    }

    try {
      if (file.storageType === StorageType.S3) {
        await this.s3Service.deleteFile(file.filename);
        return this.fileRepo.remove(file);
      }
      fs.unlinkSync(file.path);
    } catch (err) {
      console.log(err);
    }

    return this.fileRepo.remove(file);
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleFileCleanupCron() {
    const appConfig = this.configService.get<AppConfig>('app');
    this.logger.debug('Running Jobs at Every Midnight', appConfig.jobEnable);

    if (!appConfig.jobEnable) return;

    const cutoffDate = subDays(new Date(), appConfig.inactivityPeriod);

    const fileList = await this.getFiles({ cutoffDate } as FilterFileDto);

    await Promise.all(
      fileList.map(async (item) => {
        await this.deleteFile(item.privateKey);
        this.logger.log(`Deleted file: ${item.filename} due to inactivity.`);
        return item;
      }),
    );

    this.logger.log(`${fileList.length} Files cleaned successfully`);
  }
}
