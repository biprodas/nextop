import { registerAs } from '@nestjs/config';
import { version } from 'package.json';
import { Environment } from '@common/enums/environment.enum';
import { AppConfig } from './config.type';

export default registerAs<AppConfig>('app', () => {
  // validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    name: process.env.APP_NAME ?? 'app',
    nodeEnv: process.env.APP_ENV ?? Environment.Development,

    repoVersion: version,
    versioning: {
      enable: process.env.HTTP_VERSIONING_ENABLE === 'true' ?? false,
      prefix: 'v',
      version: process.env.HTTP_VERSION ?? '1',
    },
    apiPrefix: process.env.API_PREFIX || '/api',
    http: {
      enable: process.env.HTTP_ENABLE === 'true' ?? false,
      host: process.env.HTTP_HOST ?? 'localhost',
      port: process.env.HTTP_PORT
        ? Number.parseInt(process.env.HTTP_PORT)
        : 5000,
    },
    rateLimit: {
      ttl: Number.parseInt(process.env.RATE_LIMIT_TTL) ?? 60,
      max: Number.parseInt(process.env.RATE_LIMIT_MAX) ?? 5,
    },

    jobEnable: process.env.JOB_ENABLE === 'true' ?? false,
    inactivityPeriod: Number.parseInt(process.env.INACTIVITY_PERIOD) ?? 7,

    workingDirectory: process.env.PWD || process.cwd(),
    frontendDomain: process.env.FRONTEND_DOMAIN,
    backendDomain: process.env.BACKEND_DOMAIN ?? 'http://localhost',

    fallbackLanguage: process.env.APP_FALLBACK_LANGUAGE || 'en',
    // headerLanguage: process.env.APP_HEADER_LANGUAGE || 'x-custom-lang',
  };
});
