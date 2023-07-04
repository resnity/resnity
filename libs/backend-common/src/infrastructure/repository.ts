import { Collection, Filter, OptionalUnlessRequiredId } from 'mongodb';

import { Entity, EntityId } from '../domain/entity';
import { AppClsService } from '../modules/app-cls/app-cls.service';
import { MongoDbClient } from '../modules/mongodb/mongo-db.client';
import { EntityMapper } from './entity-mapper';
import { Model, TenantAwareModel } from './models';

export interface Repository<
  TEntity extends Entity<EntityId>,
  TModel extends Model,
> {
  findMany(): Promise<TEntity[]>;

  findById(id: Filter<TModel>['_id']): Promise<TEntity | null>;

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
    const tenantIdFilter: Filter<TModel>['tenantId'] =
      this._appClsService.getTenantId();

    const result = this._collection.find<TModel>({ tenantId: tenantIdFilter });
    const models = await result.toArray();

    return this._mapper.fromPersistenceModels(models);
  }

  async findById(id: Filter<TModel>['_id']) {
    const model = await this._collection.findOne<TModel>({
      _id: id,
    });
    return model ? this._mapper.fromPersistenceModel(model) : null;
  }

  async create(entity: TEntity) {
    const model = this._mapper.toPersistenceModel(entity);
    const tenantId = this._appClsService.getTenantId();

    const tenantAwareModel = { ...model, tenantId };
    await this._collection.insertOne(
      tenantAwareModel as OptionalUnlessRequiredId<TModel>,
    );
  }

  async update(entity: TEntity) {
    const { _id, ...model } = this._mapper.toPersistenceModel(entity);
    const idFilter: Filter<TModel>['_id'] = _id;
    const tenantId = this._appClsService.getTenantId();

    const tenantAwareModel = { ...model, tenantId };
    await this._collection.replaceOne({ _id: idFilter }, tenantAwareModel);
  }

  async remove(entity: TEntity) {
    const idFilter: Filter<TModel>['_id'] = entity.id;
    await this._collection.deleteOne({ _id: idFilter });
  }

  async withTransaction<T>(fn: () => Promise<T>): Promise<T> {
    let session = this._appClsService.getTransactionSession();
    if (session === undefined) {
      session = this._client.startSession();
      this._appClsService.setTransactionSession(session);
    }

    try {
      let result: T | undefined = undefined;
      await session.withTransaction(async () => {
        result = await fn();
      });
      return result as T;
    } finally {
      await this._appClsService.clearTransactionSession();
    }
  }
}
