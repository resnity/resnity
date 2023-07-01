import {
  GetTokenSilentlyOptions,
  LogoutOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js';
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';

import { useAppDispatch, useAppSelector } from '../../redux/redux.hooks';
import { AppState, AuthContext } from './AuthContext';
import { getLoginError, getTokenError } from './auth.errors';
import { hasAuthParams } from './auth.utils';
import { auth0Client } from './clients/auth0.client';
import {
  error,
  getAccessTokenComplete,
  initialize,
  logout,
} from './redux/auth.actions';
import { selectIsAuthenticated, selectUser } from './redux/auth.selectors';

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const didInitialize = useRef(false);

  useEffect(() => {
    if (didInitialize.current) {
      return;
    }
    didInitialize.current = true;

    (async () => {
      try {
        if (hasAuthParams()) {
          const { appState } = await auth0Client.handleRedirectCallback();
          const user = await auth0Client.getUser();
          navigate(appState?.returnTo ?? window.location.pathname);
          dispatch(initialize(user));
          return;
        }
        await auth0Client.checkSession();
        const user = await auth0Client.getUser();
        dispatch(initialize(user));
      } catch (err) {
        dispatch(error(getLoginError()));
      }
    })();
  }, [dispatch, navigate]);

  const handleGetAccessTokenSilently = useCallback(
    async (options?: GetTokenSilentlyOptions) => {
      try {
        return await auth0Client.getTokenSilently(options);
      } catch (err) {
        const tokenError = getTokenError();
        dispatch(error(tokenError));
        throw tokenError;
      } finally {
        const user = await auth0Client.getUser();
        dispatch(getAccessTokenComplete(user));
      }
    },
    [dispatch],
  );

  const handleLoginWithRedirect = useCallback(
    async (options?: RedirectLoginOptions<AppState>) => {
      await auth0Client.loginWithRedirect<AppState>(options);
    },
    [],
  );

  const handleLogout = useCallback(
    async (options?: LogoutOptions) => {
      await auth0Client.logout(options);
      dispatch(logout());
    },
    [dispatch],
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
