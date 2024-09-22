import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AxiosError } from 'axios';
import { Request, Response } from 'express';

import { ErrorType, Key } from '@common/enums';

@Catch()
export class AppExceptionFilter<T> implements ExceptionFilter {
  private logger = new Logger(AppExceptionFilter.name);

  constructor(public reflector: Reflector) {}

  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest<Request>();
    const res: Response = ctx.getResponse<Response>();
    // const statusCode = +exception.getStatus();

    // console.log('App Exception', exception);

    // let stack: any;
    let statusCode: HttpStatus;
    let errorName: string;
    let message: string;
    // let details: string | Record<string, any>;
    let errors: any; // for bad request

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      errorName = exception.constructor.name;
      message = exception.message;
      // details = exception.getResponse();
      const exp = exception.getResponse() as {
        errorType: ErrorType | string;
        message: string | string[];
      };
      errors = exp.message;
      if (errorName === 'CustomValidationException') {
        errors = {};
        const exp = exception.getResponse() as {
          errors: any;
          validateBy: string;
        };
        if (exp.validateBy === 'ClassValidator') {
          exp.errors.forEach(
            (err) =>
              (errors[err.property] = Object.keys(err.constraints).map(
                (key) => err.constraints[key],
              )),
          );
        }
      }
    }
    if (exception instanceof AxiosError) {
      errorName = exception.constructor.name;
      message = exception.message;
      // stack = exception.stack;
      // console.log('Error', exception.response?.data);
    }

    // Set to internal server error in case it did not match above categories.
    statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    errorName = errorName || 'InternalException';
    message = message || 'Internal server error';

    // 3rd party error (payadvantage, email, sms and other )
    if (errorName === 'AxiosError') {
      errorName = 'PayAdvantageError';
      message = 'PayAdvantage: ' + message;
    }

    // const requestContext = createRequestContext(req);
    this.logger.error(errors || message);

    return res.status(statusCode).json({
      statusCode,
      errorName,
      message,
      // details,
      errors,
      timestamp: new Date().toISOString(),
      // localizedMessage
      path: req.url,
      requestId: req.headers[Key.RequestIdTokenHeader],
    });
  }
}
