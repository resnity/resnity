import { Module, Provider } from '@nestjs/common';

import { USER_SERVICE_TOKEN } from '../auth.constants';
import { auth0AuthenticationClient } from '../libs/auth0';
import { UserServiceImpl } from './user.service';

const userServicesProvider: Provider = {
  provide: USER_SERVICE_TOKEN,
  useFactory: () => new UserServiceImpl(auth0AuthenticationClient),
};

@Module({
  providers: [userServicesProvider],
  exports: [userServicesProvider],
})
export class UserModule {}
