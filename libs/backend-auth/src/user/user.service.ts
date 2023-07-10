import { AuthenticationClient as Auth0AuthenticationClient } from 'auth0';
import { Cache } from 'cache-manager';
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
  constructor(
    private readonly _auth0AuthenticationClient: Auth0AuthenticationClient,
    private readonly _cacheManager: Cache,
  ) {}

  async getUserByAccessToken(accessToken: string): Promise<User> {
    const user = await this._getUserInfoByAccessToken(accessToken);

    const validateUser: Validate<typeof userSchema> = schemaValidatorBuilder(
      userSchema,
      () => {
        throw new UnauthorizedError();
      },
    );
    validateUser(user);

    return user;
  }

  private async _getUserInfoByAccessToken(accessToken: string) {
    const cachedUser = await this._cacheManager.get<User>(accessToken);
    if (!isNil(cachedUser)) return cachedUser;
    const usersManager = this._getUsersManager();
    const user = await usersManager.getInfo(accessToken);
    await this._cacheManager.set(accessToken, user, 30 * 1000);
    return user;
  }

  private _getUsersManager() {
    const usersManager = this._auth0AuthenticationClient.users;
    if (isNil(usersManager)) throw new InternalServerError();
    return usersManager;
  }
}
