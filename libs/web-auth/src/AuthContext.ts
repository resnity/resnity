import {
  GetTokenSilentlyOptions,
  LogoutOptions,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js';
import { createContext } from 'react';

export type AppState = {
  returnTo?: string;
  [key: string]: unknown;
};

type AuthContextValue = {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  getAccessTokenSilently: (
    options?: GetTokenSilentlyOptions,
  ) => Promise<string>;
  loginWithRedirect: (
    options?: RedirectLoginOptions<AppState>,
  ) => Promise<void>;
  logout: (options?: LogoutOptions) => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  isLoading: true,
  getAccessTokenSilently: () => Promise.resolve(''),
  loginWithRedirect: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});
