import { ConfigurableModuleBuilder } from '@nestjs/common';

import { MongoDbClientOptions } from './mongo-db.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<MongoDbClientOptions>()
    .setClassMethodName('forRoot')
    .setExtras({ isGlobal: true }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();
