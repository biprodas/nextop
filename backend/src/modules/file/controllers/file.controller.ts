import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import 'multer';
import path from 'path';

import { UploadFileDto } from '../dtos';
import { FileService } from '../services/file.service';
import { AwsS3Service } from '../services/aws-s3.service';
import { StorageType } from '../enums/storage-type.enum';

@ApiTags('files')
@Controller({ path: 'files', version: '1' })
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly s3Service: AwsS3Service,
  ) {}

  @ApiOperation({ summary: 'Upload a new file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UploadFileDto,
  })
  @ApiResponse({
    status: 201,
    description: 'The file has been successfully uploaded.',
    schema: {
      example: {
        publicKey: 'a8515bec-8cc3-4883-b6c2-3acad1ecd549',
        privateKey: '24df71b3-6395-42d8-bf40-6f27b7beb8d4',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const { publicKey, privateKey } = await this.fileService.createFile(file);
    return { publicKey, privateKey };
  }

  @ApiOperation({ summary: 'Retrieve a file by public key' })
  @ApiResponse({
    status: 200,
    description: 'The file retrieved successfully.',
    content: {
      'application/octet-stream': {
        schema: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  @Get('/:publicKey')
  async getFile(
    @Param('publicKey', ParseUUIDPipe) publicKey: string,
    @Res() res: Response,
  ) {
    const file = await this.fileService.getFile(publicKey);

    if (file.storageType === StorageType.S3) {
      const { stream, contentType } = await this.s3Service.getFile(
        file.filename,
      );

      res.set({
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${file.filename}"`,
      });

      return stream.pipe(res);
    }

    return res.sendFile(path.resolve(file.path));
  }

  @ApiOperation({ summary: 'Delete a file by private key' })
  @ApiResponse({
    status: 200,
    description: 'The file has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'File not found' })
  @Delete('/:privateKey')
  async deleteFile(@Param('privateKey', ParseUUIDPipe) privateKey: string) {
    await this.fileService.deleteFile(privateKey);

    return { message: 'File deleted successfully' };
  }
}
