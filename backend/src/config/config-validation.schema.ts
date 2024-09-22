import Joi from 'joi';
import { Environment } from '@common/enums/environment.enum';

export const configValidationSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_ENV: Joi.string()
    .valid(...Object.values(Environment))
    .default(Environment.Development)
    .required(),
  APP_LANGUAGE: Joi.string().default('en').required(),

  HTTP_ENABLE: Joi.boolean().default(true).required(),
  HTTP_HOST: [
    Joi.string().ip({ version: 'ipv4' }).required(),
    Joi.valid('localhost').required(),
  ],
  HTTP_PORT: Joi.number().default(4000).required(),
  HTTP_VERSIONING_ENABLE: Joi.boolean().default(true).required(),
  HTTP_VERSION: Joi.number().required(),

  DATABASE_HOST: Joi.string(),
  DATABASE_NAME: Joi.string(),
  DATABASE_USERNAME: Joi.string().allow(null, ''),
  DATABASE_PASSWORD: Joi.string().allow(null, ''),
  DATABASE_DEBUG: Joi.boolean(),
  DATABASE_OPTIONS: Joi.string(),

  //   // STAGE: Joi.string().required(),
  //   UPLOAD_PATH: Joi.string().required(),
  //   MAX_FILE_SIZE: Joi.number().required(),
  //   MAX_FILE_COUNTS: Joi.number().required(),
  //   DB_HOST: Joi.string().required(),
  //   DB_PORT: Joi.number().default(5432).required(),
  //   DB_USERNAME: Joi.string().required(),
  //   DB_PASSWORD: Joi.string().required(),
  //   DB_DATABASE: Joi.string().required(),
  //   JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
  //   JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
  //   JWT_ACCESS_TOKEN_EXPIRES: Joi.number().required(),
  //   JWT_REFRESH_TOKEN_EXPIRES: Joi.number().required(),
  //   // SMS_API_URL: Joi.string().allow(null, ''),
  //   // SMS_API_KEY: Joi.string().allow(null, ''),
  //   // TWILIO_ACCOUNT_SID: Joi.string().required(),
  //   // TWILIO_AUTH_TOKEN: Joi.string().required(),
});
