import { useEffect, useMemo } from 'react';

import { useAuth } from './auth.hooks';

export const LoginPage = () => {
  const { loginWithRedirect } = useAuth();
  const searchParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  useEffect(() => {
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
