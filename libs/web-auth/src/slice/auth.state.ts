import { User } from '@auth0/auth0-spa-js';

import { AppError } from '@resnity/web-common';

export type AuthState = {
  user?: User;
  error?: AppError;
};

export const authInitialState: AuthState = {};
