import { User } from '@auth0/auth0-spa-js';
import { createAction } from '@reduxjs/toolkit';

import { AppError } from '../../../libs/app-error';

const withAuthPrefix = (actionName: string) => `auth/${actionName}`;

const initialize = createAction<User | undefined>(withAuthPrefix('initialize'));

const handleRedirectComplete = createAction<User | undefined>(
  withAuthPrefix('handleRedirectComplete'),
);

const getAccessTokenComplete = createAction<User | undefined>(
  withAuthPrefix('getAccessTokenComplete'),
);

const error = createAction<AppError>(withAuthPrefix('error'));

const logout = createAction(withAuthPrefix('logout'));

export {
  error,
  getAccessTokenComplete,
  handleRedirectComplete,
  initialize,
  logout,
};
