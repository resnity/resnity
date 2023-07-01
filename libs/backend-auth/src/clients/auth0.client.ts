import { Environment, UnauthorizedError } from '@resnity/backend-common';

import axios from '../libs/axios';
import { Auth0User } from './auth0.models';

export interface Auth0Client {
  getUserInfo(accessToken: string): Promise<Auth0User>;
}

export class Auth0ClientImpl implements Auth0Client {
  constructor(private readonly environment: Environment) {}

  async getUserInfo(accessToken: string): Promise<Auth0User> {
    const url = `https://${this.environment.AUTH0_DOMAIN}/userinfo`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await Auth0User.safeParseAsync(response.data);
    if (!result.success) {
      throw new UnauthorizedError();
    }

    return result.data;
  }
}
