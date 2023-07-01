import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { AppError } from '../application/app-errors';
import { HttpResponse } from './http-response';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse<Response>();
    const httpErrorResponse = this._handleError(exception);

    response
      .status(httpErrorResponse.status ?? HttpStatus.INTERNAL_SERVER_ERROR)
      .json(httpErrorResponse);
  }

  private _handleError(error: Error) {
    if (error instanceof AppError) {
      return HttpResponse.error()
        .withMessage(error.message)
        .withStatus(error.status)
        .withCode(error.code)
        .withData(error.additionalErrors);
    }
    return HttpResponse.error();
  }
}
