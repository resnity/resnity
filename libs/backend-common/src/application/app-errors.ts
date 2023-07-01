import { HttpStatus } from '@nestjs/common';

import { DomainError } from '../domain/domain-error';

type AdditionalError = {
  code: string;
  message?: string;
};

type CreateAppErrorPayload = {
  code: string;
  message: string;
  status: HttpStatus;
  additionalErrors?: AdditionalError[];
  context?: string;
};

const CommonAppErrorCode = {
  BAD_REQUEST: '0000',
  NOT_FOUND: '0001',
  UNAUTHORIZED: '0002',
  FORBIDDEN: '0003',
} as const;

export class AppError extends Error {
  readonly code: string;
  readonly status: HttpStatus;
  readonly context?: string;
  readonly additionalErrors?: AdditionalError[];

  constructor(payload: CreateAppErrorPayload) {
    super(payload.message);
    this.code = payload.code;
    this.status = payload.status;
    this.context = payload.context;
    this.additionalErrors = payload.additionalErrors;
  }

  static fromDomain(
    error: DomainError,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    return new AppError({
      code: error.code,
      message: error.message,
      status,
      context: error.context,
      additionalErrors: error.additionalErrors,
    });
  }
}

export class NotFoundError extends AppError {
  constructor(context?: string) {
    super({
      code: CommonAppErrorCode.NOT_FOUND,
      status: HttpStatus.NOT_FOUND,
      context,
      message: 'Not found',
    });
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super({
      code: CommonAppErrorCode.NOT_FOUND,
      status: HttpStatus.UNAUTHORIZED,
      message: 'Unauthorized',
    });
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super({
      code: CommonAppErrorCode.NOT_FOUND,
      status: HttpStatus.FORBIDDEN,
      message: 'Forbidden',
    });
  }
}
