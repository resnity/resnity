import { Module } from '@nestjs/common';

import { MongoDbClient } from './mongo-db.client';
import { ConfigurableModuleClass } from './mongo-db.module-definition';


@Module({
  providers: [MongoDbClient],
  exports: [MongoDbClient],
})
export class MongoDbModule extends ConfigurableModuleClass {}
