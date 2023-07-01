import { AppError } from '@resnity/web-common';

export const AuthErrorCode = {
  GENERIC: '1000',
  LOGIN: '1001',
  TOKEN: '1002',
} as const;
export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];

export const getLoginError = () =>
  AppError.create(AuthErrorCode.LOGIN, 'Login error');

export const getTokenError = () =>
  AppError.create(AuthErrorCode.TOKEN, 'Token error');
