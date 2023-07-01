import { Auth0Client } from '@auth0/auth0-spa-js';

import { environment } from '../../../environment';

const auth0Client = new Auth0Client({
  domain: environment.VITE_AUTH0_DOMAIN,
  clientId: environment.VITE_AUTH0_CLIENT_ID,
  authorizationParams: {
    audience: environment.VITE_AUTH0_AUDIENCE,
    scope: 'openid profile email',
    redirect_uri: window.location.origin,
  },
  useRefreshTokens: true,
  useRefreshTokensFallback: true,
});

export { auth0Client };
