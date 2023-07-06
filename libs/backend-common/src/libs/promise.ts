import { AppError } from '../application/app-errors';

export const withCatch = <TSuccessReturn, TCatchReturn>(
  fn: () => Promise<TSuccessReturn>,
  onCatch: (err: unknown) => TCatchReturn,
) => {
  try {
    return fn();
  } catch (err) {
    return onCatch(err);
  }
};

export const withTransformUnknownErrorToAppError = <T = unknown>(
  fn: () => T,
) => {
  try {
    return fn();
  } catch (err) {
    throw AppError.fromUnknown(err);
  }
};
