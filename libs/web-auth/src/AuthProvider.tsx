import {
  Auth0Client,
  GetTokenSilentlyOptions,
  LogoutOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js';
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';

import { AppState, AuthContext } from './AuthContext';
import { getLoginError, getTokenError } from './auth.errors';
import { hasAuthParams } from './auth.utils';
import {
  error,
  getAccessTokenComplete,
  initialize,
  logout,
} from './slice/auth.actions';
import { authReducer } from './slice/auth.reducer';
import { authInitialState } from './slice/auth.state';

export class AuthClient extends Auth0Client {}

export type AuthProviderProps = PropsWithChildren<{
  client: AuthClient;
}>;

export const AuthProvider = ({ client, children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);
  const navigate = useNavigate();

  const user = state.user;
  const isAuthenticated = state.user !== undefined;

  const didInitialize = useRef(false);

  useEffect(() => {
    if (didInitialize.current) {
      return;
    }
    didInitialize.current = true;

    (async () => {
      try {
        if (hasAuthParams()) {
          const { appState } = await client.handleRedirectCallback();
          const user = await client.getUser();
          navigate(appState?.returnTo ?? window.location.pathname);
          dispatch(initialize(user));
          return;
        }
        await client.checkSession();
        const user = await client.getUser();
        dispatch(initialize(user));
      } catch (err) {
        dispatch(error(getLoginError()));
      }
    })();
  }, [client, dispatch, navigate]);

  const handleGetAccessTokenSilently = useCallback(
    async (options?: GetTokenSilentlyOptions) => {
      try {
        return await client.getTokenSilently(options);
      } catch (err) {
        const tokenError = getTokenError();
        dispatch(error(tokenError));
        throw tokenError;
      } finally {
        const user = await client.getUser();
        dispatch(getAccessTokenComplete(user));
      }
    },
    [client, dispatch],
  );

  const handleLoginWithRedirect = useCallback(
    async (options?: RedirectLoginOptions<AppState>) => {
      await client.loginWithRedirect<AppState>(options);
    },
    [client],
  );

  const handleLogout = useCallback(
    async (options?: LogoutOptions) => {
      await client.logout(options);
      dispatch(logout());
    },
    [client, dispatch],
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        getAccessTokenSilently: handleGetAccessTokenSilently,
        loginWithRedirect: handleLoginWithRedirect,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
