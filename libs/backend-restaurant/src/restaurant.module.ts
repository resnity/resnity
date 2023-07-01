import { Module, Provider } from '@nestjs/common';

import {
  AppClsModule,
  AppClsService,
  ENVIRONMENT_TOKEN,
  Environment,
  MapperModule,
  MongoDbClient,
  initMappingProfile,
  mapper,
} from '@resnity/backend-common';

import { RestaurantController } from './api/restaurant.controller';
import { RestaurantEventListener } from './api/restaurant.event-listener';
import {
  RESTAURANT_EVENT_HANDLERS_TOKEN,
  RestaurantEventHandlersImpl,
} from './application/restaurant.event-handlers';
import {
  RESTAURANT_SERVICE_TOKEN,
  RestaurantServiceImpl,
} from './application/restaurant.services';
import {
  RESTAURANT_MAPPER_TOKEN,
  RestaurantMapper,
  RestaurantMapperImpl,
  restaurantMappingProfile,
} from './infrastructure/restaurant.mapper';
import {
  RESTAURANT_REPOSITORY_TOKEN,
  RestaurantRepositoryImpl,
} from './infrastructure/restaurant.repository';

initMappingProfile(mapper, restaurantMappingProfile);

const mapperProvider: Provider = {
  provide: RESTAURANT_MAPPER_TOKEN,
  useClass: RestaurantMapperImpl,
};

const repositoryProvider: Provider = {
  provide: RESTAURANT_REPOSITORY_TOKEN,
  useFactory: (
    environment: Environment,
    client: MongoDbClient,
    mapper: RestaurantMapper,
    appClsService: AppClsService,
  ) =>
    new RestaurantRepositoryImpl(
      client,
      client
        .db(environment.DB_NAME)
        .collection(environment.RESTAURANT_DB_COLLECTION),
      mapper,
      appClsService,
    ),
  inject: [
    ENVIRONMENT_TOKEN,
    MongoDbClient,
    RESTAURANT_MAPPER_TOKEN,
    AppClsService,
  ],
};

const servicesProvider: Provider = {
  provide: RESTAURANT_SERVICE_TOKEN,
  useClass: RestaurantServiceImpl,
};

const eventHandlersProvider: Provider = {
  provide: RESTAURANT_EVENT_HANDLERS_TOKEN,
  useClass: RestaurantEventHandlersImpl,
};

@Module({
  imports: [AppClsModule, MapperModule],
  controllers: [RestaurantController],
  providers: [
    mapperProvider,
    repositoryProvider,
    servicesProvider,
    eventHandlersProvider,
    RestaurantEventListener,
  ],
})
export class RestaurantModule {}
