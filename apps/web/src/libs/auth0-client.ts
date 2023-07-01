import { Auth0Client } from '@auth0/auth0-spa-js';

import { environment } from '../environment';

export const auth0Client = new Auth0Client({
  domain: environment.VITE_OAUTH2_DOMAIN,
  clientId: environment.VITE_OAUTH2_CLIENT_ID,
  authorizationParams: {
    audience: environment.VITE_OAUTH2_AUDIENCE,
    scope: 'openid profile email',
    redirect_uri: window.location.origin,
  },
  useRefreshTokens: true,
  useRefreshTokensFallback: true,
});
