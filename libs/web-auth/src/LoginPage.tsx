import { useEffect } from 'react';

import { useAuth } from './auth.hooks';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return null;
};
