export class AppError extends Error {
  code: string;

  private constructor(code: string, message?: string) {
    super(message);
    this.code = code;
  }

  static create(code: string, message?: string): AppError {
    return new AppError(code, message);
  }

  static ofCode(code: string): AppError {
    return new AppError(code);
  }
}
