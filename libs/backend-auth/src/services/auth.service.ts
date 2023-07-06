import {
  UnauthorizedError,
  Validate,
  schemaValidatorBuilder,
} from '@resnity/backend-common';

import { OAuth2Client } from '../clients/oauth2.client.types';
import { User, userSchema } from './auth.service.types';

export interface AuthService {
  getUserInfo(accessToken: string): Promise<User>;
}

export class AuthServiceImpl implements AuthService {
  constructor(private readonly oAuth2Client: OAuth2Client) {}

  async getUserInfo(accessToken: string): Promise<User> {
    const user = await this.oAuth2Client.getUserInfo(accessToken);

    const validateUser: Validate<typeof userSchema> = schemaValidatorBuilder(
      userSchema,
      () => {
        throw new UnauthorizedError();
      },
    );
    validateUser(user);

    return user;
  }
}
