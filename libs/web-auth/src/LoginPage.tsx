import { useEffect } from 'react';

import { useSearchParams } from '@resnity/web-common';

import { useAuth } from './auth.hooks';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth();
  const searchParams = useSearchParams();

  useEffect(() => {
    loginWithRedirect({
      authorizationParams: searchParams,
    });
  }, [searchParams, loginWithRedirect]);

  return null;
};
