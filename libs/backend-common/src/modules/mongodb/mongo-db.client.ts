import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { MongoClient } from 'mongodb';

import { MongoDbClientOptions } from './mongo-db.interface';
import { MODULE_OPTIONS_TOKEN } from './mongo-db.module-definition';


@Injectable()
export class MongoDbClient
  extends MongoClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    { uri, ...options }: MongoDbClientOptions,
  ) {
    super(uri, options);
  }

  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.close();
  }
}
