import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.enum.constant';
import { AppConfig, DbConfig } from 'src/config/config.type';

const defaultConnection = (
  configService: ConfigService,
): MongooseModuleOptions => {
  const appConfig = configService.get<AppConfig>('app');
  const dbConfig = configService.get<DbConfig>('database');

  // console.log(appConfig.nodeEnv, dbConfig);

  let uri = `${dbConfig.host}`;
  //   const options = dbConfig.options ? `?${dbConfig.options}` : '';

  if (dbConfig.name) {
    uri = `${uri}/${dbConfig.name}`;
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
};

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: defaultConnection,
    // useFactory: (configService: ConfigService) => ({
    //   uri: configService.get<string>('MONGODB_URI'),
    //   connectionFactory: (connection) => {
    //     connection.plugin(mongooseAutopopulate);
    //     connection.plugin(slug);
    //     return connection;
    //   },
    // }),
  }),
];
