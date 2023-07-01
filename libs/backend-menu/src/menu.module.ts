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

import { MenuController } from './api/menu.controller';
import {
  MENU_SERVICES_TOKEN,
  MenuServicesImpl,
} from './application/menu.services';
import {
  MENU_MAPPER_TOKEN,
  MenuMapper,
  MenuMapperImpl,
  menuMappingProfile,
} from './infrastructure/menu.mapper';
import {
  MENU_REPOSITORY_TOKEN,
  MenuRepositoryImpl,
} from './infrastructure/menu.repository';

initMappingProfile(mapper, menuMappingProfile);

const mapperProvider: Provider = {
  provide: MENU_MAPPER_TOKEN,
  useClass: MenuMapperImpl,
};

const repositoryProvider: Provider = {
  provide: MENU_REPOSITORY_TOKEN,
  useFactory: (
    environment: Environment,
    client: MongoDbClient,
    mapper: MenuMapper,
    appClsService: AppClsService,
  ) =>
    new MenuRepositoryImpl(
      client,
      client.db(environment.DB_NAME).collection(environment.MENU_DB_COLLECTION),
      mapper,
      appClsService,
    ),
  inject: [ENVIRONMENT_TOKEN, MongoDbClient, MENU_MAPPER_TOKEN, AppClsService],
};

const servicesProvider: Provider = {
  provide: MENU_SERVICES_TOKEN,
  useClass: MenuServicesImpl,
};

@Module({
  imports: [AppClsModule, MapperModule],
  controllers: [MenuController],
  providers: [mapperProvider, repositoryProvider, servicesProvider],
})
export class MenuModule {}
