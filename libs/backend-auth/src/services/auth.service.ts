import { UnauthorizedError } from '@resnity/backend-common';

import { Auth0Client } from '../clients/auth0.client';
import { User } from './auth.types';

export interface AuthService {
  getUserInfo(accessToken: string): Promise<User>;
}

export class AuthServiceImpl implements AuthService {
  constructor(private readonly auth0Client: Auth0Client) {}

  async getUserInfo(accessToken: string): Promise<User> {
    const auth0User = await this.auth0Client.getUserInfo(accessToken);

    const result = await User.safeParseAsync(auth0User);
    if (!result.success) {
      throw new UnauthorizedError();
    }

    return result.data;
  }
}
