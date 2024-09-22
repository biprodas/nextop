import { Environment } from '@common/enums/environment.enum';
import Joi from 'joi';

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

  STORAGE_TYPE: Joi.string().required(),
  UPLOAD_PATH: Joi.string().required(),
  INACTIVITY_PERIOD: Joi.string().required(),

  DB_TYPE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_DATABASE: Joi.string().required(),
});
