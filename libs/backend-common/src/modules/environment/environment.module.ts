import { Global, Module, Provider } from '@nestjs/common';

import { environment } from './environment';

const ENVIRONMENT_TOKEN = Symbol('ENVIRONMENT_TOKEN');

const environmentProvider: Provider = {
  provide: ENVIRONMENT_TOKEN,
  useValue: environment,
};

@Global()
@Module({
  providers: [environmentProvider],
  exports: [environmentProvider],
})
class EnvironmentModule {}

export { EnvironmentModule, ENVIRONMENT_TOKEN };
