import { Injectable } from '@nestjs/common';
import { MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { IDatabaseOptionsService } from '../interfaces/database.options-service.interface';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import { AppConfig, DbConfig } from 'src/config/config.type';

@Injectable()
export class DatabaseOptionsService implements IDatabaseOptionsService {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): MongooseModuleOptions {
    const appConfig = this.configService.get<AppConfig>('app');
    const dbConfig = this.configService.get<DbConfig>('db');

    // console.log(appConfig.nodeEnv, dbConfig);

    const options = dbConfig.options ? `?${dbConfig.options}` : '';

    let uri = `${dbConfig.host}`;

    if (dbConfig.name) {
      uri = `${uri}/${dbConfig.name}${options}`;
    }

    if (appConfig.nodeEnv !== ENUM_APP_ENVIRONMENT.PRODUCTION) {
      mongoose.set('debug', dbConfig.debug);
    }

    const mongooseOptions: MongooseModuleOptions = {
      uri,
      serverSelectionTimeoutMS: 5000,
      autoCreate: true,
    };

    if (dbConfig.username && dbConfig.password) {
      mongooseOptions.auth = {
        username: dbConfig.username,
        password: dbConfig.password,
      };
    }

    return mongooseOptions;
  }
}
