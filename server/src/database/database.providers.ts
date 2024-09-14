import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DbConfig } from 'src/config/config.type';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

const defaultConnection = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  const isProduction = configService.get('APP_ENV') === 'production';
  const dbConfig = configService.get<DbConfig>('db');

  return {
    ssl: isProduction,
    extra: {
      ssl: isProduction ? { rejectUnauthorized: false } : null,
    },
    type: 'postgres',
    autoLoadEntities: true,
    // subscribers: [UserSubscriber],
    synchronize: !isProduction,
    // logging: true,
    database: dbConfig.name,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
  };
};

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: defaultConnection,
    dataSourceFactory: (options) => {
      if (!options) {
        throw new Error('Invalid options passed');
      }
      return Promise.resolve(
        addTransactionalDataSource(new DataSource(options)),
      );
    },
  }),
];
