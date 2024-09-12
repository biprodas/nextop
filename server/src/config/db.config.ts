import { registerAs } from '@nestjs/config';
import { DbConfig } from './config.type';

export default registerAs<DbConfig>('db', () => ({
  type: process.env?.DB_TYPE ?? 'postgres',
  host: process.env?.DB_HOST ?? 'localhost',
  //   host: process.env?.DATABASE_HOST ??
  //     'mongodb://localhost:27017,localhost:27018,localhost:27019',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  name: process.env?.DB_DATABASE ?? 'ry',
  username: process.env?.DB_USERNAME,
  password: process?.env.DB_PASSWORD,
  debug: process.env.DB_DEBUG === 'true',
  options: process.env?.DB_OPTIONS,
}));

// export default registerAs<DatabaseConfig>('database', () => {
//   // validateConfig(process.env, EnvironmentVariablesValidator);

//   return {
//     url: process.env.DATABASE_URL,
//     type: process.env.DATABASE_TYPE,
//     host: process.env.DATABASE_HOST,
//     port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT, 10) : 5432,
//     name: process.env.DATABASE_NAME,
//     password: process.env.DATABASE_PASSWORD,
//     debug: process.env.DATABASE_DEBUG === 'true',
//     options: process.env?.DATABASE_OPTIONS,
//     username: process.env.DATABASE_USERNAME,
//     synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
//     maxConnections: process.env.DATABASE_MAX_CONNECTIONS
//       ? parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10)
//       : 100,
//     sslEnabled: process.env.DATABASE_SSL_ENABLED === 'true',
//     rejectUnauthorized: process.env.DATABASE_REJECT_UNAUTHORIZED === 'true',
//     ca: process.env.DATABASE_CA,
//     key: process.env.DATABASE_KEY,
//     cert: process.env.DATABASE_CERT,
//   };
// });
