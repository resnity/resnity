import { useEffect } from 'react';

import { useAuth } from './auth.hooks';

export const LogoutPage = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }, [logout]);

  return null;
};
