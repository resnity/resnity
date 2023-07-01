import { z } from 'zod';

export const AuthErrorCode = {
  GENERIC: 1000,
  LOGIN: 1001,
  TOKEN: 1002,
} as const;
export type AuthErrorCode = (typeof AuthErrorCode)[keyof typeof AuthErrorCode];
