type AdditionalError = {
  code: string;
  message?: string;
};

export type CreateDomainErrorPayload = {
  code: string;
  message?: string;
  context?: string;
  additionalErrors?: AdditionalError[];
};

export class DomainError extends Error {
  readonly code: string;
  readonly timestamp: string;
  readonly context?: string;
  readonly additionalErrors?: AdditionalError[];

  constructor(payload: CreateDomainErrorPayload) {
    super(payload.message);
    this.code = payload.code;
    this.context = payload.context;
    this.timestamp = new Date().toISOString();
    this.additionalErrors = payload.additionalErrors;
  }

  static ofCode(code: string) {
    return new DomainError({ code });
  }
}
