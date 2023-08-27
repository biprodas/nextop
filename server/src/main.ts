import { NestApplication, NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app/app.module';
import { useContainer } from 'class-validator';
import { AppConfig } from './configs/config.type';
// import swaggerInit from './swagger';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  // console.log('Main', appConfig);

  const logger = new Logger();

  // Global
  app.setGlobalPrefix(appConfig.apiPrefix);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Versioning
  if (appConfig.versioning.enable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: appConfig.versioning.version,
      prefix: appConfig.versioning.prefix,
    });
  }

  // Swagger
  // await swaggerInit(app);

  // Listen
  await app.listen(appConfig.http.port, appConfig.http.host);

  // logger.log(`==========================================================`);

  // logger.log(`Environment Variable`, 'NestApplication');
  // logger.log(JSON.parse(JSON.stringify(process.env)), 'NestApplication');

  logger.log(`======================================================================`);

  logger.log(`Job is ${appConfig.jobEnable}`, 'NestApplication');
  logger.log(
    `Http is ${appConfig.http.enable}, ${
      appConfig.http.enable ? 'routes registered' : 'no routes registered'
    }`,
    'NestApplication',
  );
  logger.log(`Http versioning is ${appConfig.versioning.enable}`, 'NestApplication');

  logger.log(`Http Server running on ${await app.getUrl()}`, 'NestApplication');
  // logger.log(`Database uri ${databaseUri}`, 'NestApplication');

  logger.log(`======================================================================`);
}
bootstrap();
