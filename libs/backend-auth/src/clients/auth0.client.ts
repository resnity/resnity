import {
  Environment,
  UnauthorizedError,
  Validate,
  schemaValidatorBuilder,
} from '@resnity/backend-common';

import axios from '../libs/axios';
import { OAuth2Client, UserInfo, userInfoSchema } from './oauth2.client.types';

export class Auth0ClientImpl implements OAuth2Client {
  constructor(private readonly environment: Environment) {}

  async getUserInfo(accessToken: string): Promise<UserInfo> {
    const url = `https://${this.environment.AUTH0_DOMAIN}/userinfo`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userInfo = response.data;
    const validateUserInfo: Validate<typeof userInfoSchema> =
      schemaValidatorBuilder(userInfo, () => {
        throw new UnauthorizedError();
      });
    validateUserInfo(userInfo);

    return userInfo;
  }
}
