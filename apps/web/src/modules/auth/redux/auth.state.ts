import { User } from '@auth0/auth0-spa-js';

import { AppError } from '../../../libs/app-error';

type AuthState = {
  user?: User;
  error?: AppError;
};

const authInitialState: AuthState = {};

export { authInitialState };
export type { AuthState };
