export interface IFile extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string; // S3->bucket
  filename: string; // S3->key
  path: string; // S3->location
  size: number;
}

export interface S3File extends Express.Multer.File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  bucket: string;
  key: string; // filename
  acl: string;
  contentType: string;
  contentDisposition: null;
  contentEncoding: null;
  storageClass: string;
  serverSideEncryption: null;
  location: string; // path
  etag: string;
}
