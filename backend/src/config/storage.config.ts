import { registerAs } from '@nestjs/config';

export default registerAs(
  'storage',
  (): Record<string, any> => ({
    type: process.env.STORAGE_TYPE ?? 'LOCAL',
    local: {
      uploadPath: process.env.UPLAOD_PATH ?? 'public/uploads',
    },
    s3: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
      region: process.env.AWS_S3_BUCKET_REGION,
      bucket: process.env.AWS_S3_BUCKET_NAME ?? 'bucket',
      apiVersion: process.env.AWS_S3_API_VERSION,
      baseUrl: `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_S3_REGION}.amazonaws.com`,
    },
  }),
);
