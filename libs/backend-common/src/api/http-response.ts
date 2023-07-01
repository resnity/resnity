import { HttpStatus } from '@nestjs/common';

type CreateHttpResponsePayload<T> = {
  message: string;
  status: number;
  code?: string;
  data?: T;
};

export class HttpResponse<T = unknown> {
  timestamp: string;
  message?: string;
  status?: number;
  code?: string;
  data?: T;

  constructor(payload: CreateHttpResponsePayload<T>) {
    this.message = payload.message;
    this.status = payload.status;
    this.code = payload.code;
    this.data = payload.data;
    this.timestamp = new Date().toISOString();
  }

  static ok<T>(data?: T) {
    return new HttpResponse<T>({
      message: 'Ok',
      status: HttpStatus.OK,
      data,
    });
  }

  static error<T>() {
    return new HttpResponse<T>({
      message: 'Internal server error',
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }

  withMessage(message?: string) {
    this.message = message;
    return this;
  }

  withStatus(status?: HttpStatus) {
    this.status = status;
    return this;
  }

  withCode(code?: string) {
    this.code = code;
    return this;
  }

  withData(data?: T) {
    this.data = data;
    return this;
  }
}
