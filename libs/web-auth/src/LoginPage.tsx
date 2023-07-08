import { useLayoutEffect } from 'react';

import { useSearchParams } from '@resnity/web-common';

import { useAuth } from './auth.hooks';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth();
  const searchParams = useSearchParams();

  useLayoutEffect(() => {
    loginWithRedirect({
      authorizationParams: {
        invitation: searchParams.get('invitation') ?? undefined,
        organization: searchParams.get('organization') ?? undefined,
        organization_name: searchParams.get('organization_name') ?? undefined,
      },
    });
  }, [searchParams, loginWithRedirect]);

  return null;
};
