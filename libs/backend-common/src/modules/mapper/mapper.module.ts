import { Module, Provider } from '@nestjs/common';

import { MAPPER_TOKEN, mapper } from './mapper.utils';

const mapperProvider: Provider = {
  provide: MAPPER_TOKEN,
  useValue: mapper,
};

@Module({
  providers: [mapperProvider],
  exports: [mapperProvider],
})
export class MapperModule {}
