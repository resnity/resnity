import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Module, Provider } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { USER_SERVICE_TOKEN } from '../auth.constants';
import { auth0AuthenticationClient } from '../libs/auth0';
import { UserServiceImpl } from './user.service';

const userServicesProvider: Provider = {
  provide: USER_SERVICE_TOKEN,
  useFactory: (cacheManager: Cache) =>
    new UserServiceImpl(auth0AuthenticationClient, cacheManager),
  inject: [CACHE_MANAGER],
};

@Module({
  providers: [userServicesProvider],
  exports: [userServicesProvider],
})
export class UserModule {}
