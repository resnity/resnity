import { Module, Provider } from '@nestjs/common';

import { ENVIRONMENT_TOKEN, Environment } from '@resnity/backend-common';

import { JWT_SERVICE_TOKEN } from '../auth.constants';
import { JwtServiceImpl } from './jwt.service';

const jwtServiceProvider: Provider = {
  provide: JWT_SERVICE_TOKEN,
  useFactory: (environment: Environment) => new JwtServiceImpl(environment),
  inject: [ENVIRONMENT_TOKEN],
};

@Module({
  exports: [jwtServiceProvider],
  providers: [jwtServiceProvider],
})
export class JwtModule {}
