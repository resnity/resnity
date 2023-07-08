import { Collection, Filter, OptionalUnlessRequiredId } from 'mongodb';

import { ForbiddenError } from '../application/app-errors';
import { Entity, EntityId } from '../domain/entity';
import { isNil } from '../libs/guards';
import {
  APP_CLS_TENANT_ID,
  APP_CLS_TRANSACTION_SESSION,
} from '../modules/app-cls/app-cls.constants';
import { AppClsService } from '../modules/app-cls/app-cls.service';
import { MongoDbClient } from '../modules/mongodb/mongo-db.client';
import { EntityMapper } from './entity-mapper';
import { Model, TenantAwareModel } from './models';

export interface Repository<
  TEntity extends Entity<EntityId>,
  TModel extends Model,
> {
  findMany(): Promise<TEntity[]>;
  findById(id: Filter<TModel>['_id']): Promise<TEntity | undefined>;
  create(entity: TEntity): Promise<void>;
  update(entity: TEntity): Promise<void>;
  remove(entity: TEntity): Promise<void>;
  withTransaction<T>(fn: () => Promise<T>): Promise<T>;
}

export class RepositoryImpl<
  TEntity extends Entity<EntityId>,
  TModel extends TenantAwareModel,
> implements Repository<TEntity, TModel>
{
  constructor(
    private readonly _client: MongoDbClient,
    private readonly _collection: Collection<TModel>,
    private readonly _mapper: EntityMapper<TEntity, unknown, TModel>,
    private readonly _appClsService: AppClsService,
  ) {}

  async findMany() {
    const tenantId: Filter<TModel>['tenantId'] = this._getTenantId();

    const result = this._collection.find<TModel>({ tenantId });
    const models = await result.toArray();

    return this._mapper.fromPersistenceModels(models);
  }

  async findById(id: Filter<TModel>['_id']) {
    const model = await this._collection.findOne<TModel>(
      { _id: id },
      { session: this._getSession() },
    );
    return model ? this._mapper.fromPersistenceModel(model) : undefined;
  }

  async create(entity: TEntity) {
    const model = this._mapper.toPersistenceModel(entity);
    const tenantAwaredModel = { ...model, tenantId: this._getTenantId() };

    await this._collection.insertOne(
      tenantAwaredModel as OptionalUnlessRequiredId<TModel>,
      { session: this._getSession() },
    );
  }

  async update(entity: TEntity) {
    const model = this._mapper.toPersistenceModel(entity);

    const _id: Filter<TModel>['_id'] = model._id;
    const tenantAwareModel = { ...model, tenantId: this._getTenantId() };

    await this._collection.replaceOne({ _id: _id }, tenantAwareModel, {
      session: this._getSession(),
    });
  }

  async remove(entity: TEntity) {
    const _id: Filter<TModel>['_id'] = entity.id;
    const tenantId: Filter<TModel>['tenantId'] = this._getTenantId();

    await this._collection.deleteOne(
      { _id, tenantId },
      { session: this._getSession() },
    );
  }

  async withTransaction<T>(fn: () => Promise<T>): Promise<T> {
    let session = this._appClsService.get(APP_CLS_TRANSACTION_SESSION);
    if (session === undefined) {
      session = this._client.startSession();
      this._appClsService.set(APP_CLS_TRANSACTION_SESSION, session);
    }

    try {
      let result: T | undefined = undefined;
      await session.withTransaction(async () => {
        result = await fn();
      });
      return result as T;
    } finally {
      await this._appClsService.get(APP_CLS_TRANSACTION_SESSION)?.endSession();
    }
  }

  private _getSession() {
    return this._appClsService.get(APP_CLS_TRANSACTION_SESSION);
  }

  private _getTenantId() {
    const tenantId = this._appClsService.get(APP_CLS_TENANT_ID);
    if (isNil(tenantId)) throw new ForbiddenError('TenantId is missing');
    return tenantId;
  }
}
