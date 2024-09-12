import { StorageType } from '@common/enums/storage-type.enum';

export type AppConfig = {
  nodeEnv: string;
  name: string;
  workingDirectory: string;
  frontendDomain?: string;
  backendDomain: string;
  repoVersion: string;
  apiPrefix: string; // globalPrefix
  versioning: {
    enable: boolean;
    prefix: string;
    version: string;
  };
  http: {
    enable: boolean;
    host: string;
    port: number;
  };
  jobEnable: boolean;

  rateLimit: {
    ttl: number; // in second
    max: number;
  };

  inactivityPeriod: number;

  fallbackLanguage: string;
  // headerLanguage: string;
};

export type AppleConfig = {
  appAudience: string[];
};

export type AuthConfig = {
  secret?: string;
  expires?: string;
  refreshSecret?: string;
  refreshExpires?: string;
};

export type DbConfig = {
  url?: string;
  type?: string;
  host?: string;
  port?: number;
  name?: string;
  username?: string;
  password?: string;
  debug?: boolean;
  options?: string;
  synchronize?: boolean;
  maxConnections?: number;
  sslEnabled?: boolean;
  rejectUnauthorized?: boolean;
  ca?: string;
  key?: string;
  cert?: string;
};

export type StorageConfig = {
  type: StorageType;
  local: {
    uploadPath: string;
  };
  s3: {
    accessKeyId?: string;
    secretAccessKey?: string;
    region?: string;
    bucket?: string;
    apiVersion?: string;
    baseUrl?: string;
  };
};

export type FacebookConfig = {
  appId?: string;
  appSecret?: string;
};

export type FileConfig = {
  driver: string;
  accessKeyId?: string;
  secretAccessKey?: string;
  awsDefaultS3Bucket?: string;
  awsDefaultS3Url?: string;
  awsS3Region?: string;
  maxFileSize: number;
};

export type GoogleConfig = {
  clientId?: string;
  clientSecret?: string;
};

export type MailConfig = {
  port: number;
  host?: string;
  user?: string;
  password?: string;
  defaultEmail?: string;
  defaultName?: string;
  ignoreTLS: boolean;
  secure: boolean;
  requireTLS: boolean;
};

export type TwitterConfig = {
  consumerKey?: string;
  consumerSecret?: string;
};

export type AllConfigType = {
  app: AppConfig;
  apple: AppleConfig;
  auth: AuthConfig;
  database: DbConfig;
  facebook: FacebookConfig;
  file: FileConfig;
  google: GoogleConfig;
  mail: MailConfig;
  twitter: TwitterConfig;
};
