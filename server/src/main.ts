import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory, Reflector } from '@nestjs/core';
import { useContainer } from 'class-validator';
import compression from 'compression';
import { json } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { join } from 'path';

import { AppExceptionFilter } from '@common/filters/app.exception';
import { QueryFailedErrorFilter } from '@common/filters/query-failed-error.filter';
import { RequestIdMiddleware } from '@common/middlewares/request-id.middleware';
import { AppModule } from './app/app.module';
import { AppConfig } from './config/config.type';
import { swaggerInit } from './api-docs.swagger';
import { initializeTransactionalContext } from 'typeorm-transactional';

export async function bootstrap() {
  initializeTransactionalContext();

  const app: NestApplication = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  // console.log('Main', appConfig);

  const logger = new Logger('Bootstrap Logger');

  app.useStaticAssets(join(__dirname, '..', 'public'));

  const corsOptions = {
    origin: true,
    credentials: true,
  };
  app.enableCors(corsOptions);
  // app.use(requestIp.mw()); // req.clientIp
  app.use(RequestIdMiddleware);
  app.use(json({ limit: '20mb' }));
  // secure app against known security vulnerabilities
  app.use(helmet());
  // enable gzip compression.
  app.use(compression());

  app.use(
    rateLimit({
      windowMs: appConfig.rateLimit.ttl * 1000,
      max: appConfig.rateLimit.max,
      message: 'Too many requests from this IP, please try again later',
      // keyGenerator: (req) => requestIp.getClientIp(req),
    }),
  );

  const reflector = app.get(Reflector);

  app.useGlobalFilters(
    new AppExceptionFilter(reflector),
    new QueryFailedErrorFilter(reflector),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipUndefinedProperties: true,
    }),
  );

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
  await swaggerInit(app, appConfig.versioning.version);

  // Listen
  await app.listen(appConfig.http.port, appConfig.http.host);

  logger.log(`==================================================`);

  logger.log(`Job is ${appConfig.jobEnable}`);
  logger.log(
    `Http is ${appConfig.http.enable ? '' : 'not'} enabled, ${
      appConfig.http.enable ? 'Routes registered' : 'No routes registered'
    }`,
  );
  logger.log(
    `Http versioning is ${!appConfig.versioning.enable || 'not'} enabled`,
  );

  logger.log(`Http Server running on ${await app.getUrl()}`);

  logger.log(`==================================================`);

  return app;
}

void bootstrap();
