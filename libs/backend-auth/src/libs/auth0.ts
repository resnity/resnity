import {
  AuthenticationClient as Auth0AuthenticationClient,
  ManagementClient as Auth0ManagementClient,
} from 'auth0';

import { environment } from '@resnity/backend-common';

export const auth0AuthenticationClient = new Auth0AuthenticationClient({
  domain: environment.OAUTH2_DOMAIN,
  clientId: environment.OAUTH2_CLIENT_ID,
  clientSecret: environment.OAUTH2_CLIENT_SECRET,
});

export const auth0ManagementClient = new Auth0ManagementClient({
  audience: `https://${environment.OAUTH2_DOMAIN}/api/v2/`,
  domain: environment.OAUTH2_DOMAIN,
  clientId: environment.OAUTH2_CLIENT_ID,
  clientSecret: environment.OAUTH2_CLIENT_SECRET,
  scope: 'read:organizations read:organizations_summary',
  tokenProvider: { enableCache: true },
});
