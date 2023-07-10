import { AuthenticationClient as Auth0AuthenticationClient } from 'auth0';
import { isNil } from 'lodash';

import {
  InternalServerError,
  UnauthorizedError,
  Validate,
  schemaValidatorBuilder,
} from '@resnity/backend-common';

import { User, userSchema } from './user.service.types';

export type UserService = {
  getUserByAccessToken(accessToken: string): Promise<User>;
};

export class UserServiceImpl implements UserService {
  constructor(private readonly _client: Auth0AuthenticationClient) {}

  async getUserByAccessToken(accessToken: string): Promise<User> {
    const usersManager = this._getUsersManager();
    const user = await usersManager.getInfo(accessToken);

    const validateUser: Validate<typeof userSchema> = schemaValidatorBuilder(
      userSchema,
      () => {
        throw new UnauthorizedError();
      },
    );
    validateUser(user);

    return user;
  }

  private _getUsersManager() {
    const usersManager = this._client.users;
    if (isNil(usersManager)) throw new InternalServerError();
    return usersManager;
  }
}
