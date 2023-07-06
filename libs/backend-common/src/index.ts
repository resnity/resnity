export { HttpExceptionFilter } from './api/http-exception.filter';
export { HttpResponse } from './api/http-response';
export { EmbeddedResponseDto, ResponseDto } from './api/response-dtos';

export {
  AppError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from './application/app-errors';

export { AggregateRoot } from './domain/aggregate-root';
export { DomainError } from './domain/domain-error';
export {
  createEntityId,
  BaseEntityPayload,
  Entity,
  EntityId,
} from './domain/entity';
export { ValueObject } from './domain/value-object';
export { DomainEvent } from './domain/domain-event';
export type { CreateEventPayload } from './domain/domain-event';

export type { EntityMapper } from './infrastructure/entity-mapper';
export {
  EmbeddedModel,
  Model,
  TenantAwareModel,
} from './infrastructure/models';
export type { Repository } from './infrastructure/repository';
export { RepositoryImpl } from './infrastructure/repository';

export { isNil, isUndefined } from './libs/guards';
export { withTransformUnknownErrorToAppError } from './libs/promise';
export {
  extractMapKeys,
  extractMapValues,
  mapClassInstancesToMapBy,
} from './libs/transforms';
export {
  domainSchemaValidatorBuilder,
  schemaValidatorBuilder,
  validateOrThrowDomainError,
} from './libs/validator';
export type { Validate } from './libs/validator';

export {
  APP_CLS_TENANT_ID,
  APP_CLS_TRANSACTION_SESSION,
  APP_CLS_USER,
} from './modules/app-cls/app-cls.constants';
export { AppClsModule } from './modules/app-cls/app-cls.module';
export { AppClsService } from './modules/app-cls/app-cls.service';

export { environment } from './modules/environment/environment';
export type { Environment } from './modules/environment/environment';
export {
  EnvironmentModule,
  ENVIRONMENT_TOKEN,
} from './modules/environment/environment.module';

export { MapperModule } from './modules/mapper/mapper.module';
export {
  extendBaseEntityToModelMap,
  extendBaseEntityToResponseDtoMap,
  extendBaseModelToEntityMap,
  initMappingProfile,
  mapper,
  MAPPER_TOKEN,
} from './modules/mapper/mapper.utils';

export { MongoDbClient } from './modules/mongodb/mongo-db.client';
export { MongoDbModule } from './modules/mongodb/mongo-db.module';

export { RequestContext } from './modules/request-context/request-context';
export { RequestContextMiddleware } from './modules/request-context/request-context.middleware';
export { RequestContextModule } from './modules/request-context/request-context.module';
export { RequestContextService } from './modules/request-context/request-context.service';
