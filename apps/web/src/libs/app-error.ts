export type AppError<T = number> = {
  code: T;
  message?: string;
};

export const createAppError = <T = number>(
  code: T,
  message?: string,
): AppError<T> => ({
  code,
  message,
});
