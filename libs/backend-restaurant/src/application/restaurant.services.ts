import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import {
  NotFoundError,
  isNil,
  withTransformUnknownErrorToAppError,
} from '@resnity/backend-common';

import { Restaurant } from '../domain/restaurant.aggregate-root';
import {
  RESTAURANT_REPOSITORY_TOKEN,
  RestaurantRepository,
} from '../infrastructure/restaurant.repository';
import {
  CreateRestaurantServicePayload,
  CreateStoreServicePayload,
  CreateTableServicePayload,
  SetupRestaurantServicePayload,
  UpdateRestaurantServicePayload,
  UpdateStoreServicePayload,
  UpdateTableServicePayload,
} from './restaurant.services.types';

export const RESTAURANT_SERVICE_TOKEN = Symbol('RESTAURANT_SERVICE_TOKEN');

export interface RestaurantServices {
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurantById(restaurantId: string): Promise<Restaurant>;

  setupRestaurant(payload: SetupRestaurantServicePayload): Promise<void>;
  createRestaurant(payload: CreateRestaurantServicePayload): Promise<string>;
  updateRestaurantById(
    restaurantId: string,
    payload: UpdateRestaurantServicePayload,
  ): Promise<void>;
  removeRestaurantById(restaurantId: string): Promise<void>;

  createStore(
    restaurantId: string,
    payload: CreateStoreServicePayload,
  ): Promise<string>;
  updateStoreById(
    restaurantId: string,
    storeId: string,
    payload: UpdateStoreServicePayload,
  ): Promise<void>;
  removeStoreById(restaurantId: string, storeId: string): Promise<void>;

  createTable(
    restaurantId: string,
    storeId: string,
    payload: CreateTableServicePayload,
  ): Promise<string>;
  updateTableById(
    restaurantId: string,
    storeId: string,
    tableId: string,
    payload: UpdateTableServicePayload,
  ): Promise<void>;
  removeTableById(
    restaurantId: string,
    storeId: string,
    tableId: string,
  ): Promise<void>;
}

export class RestaurantServiceImpl implements RestaurantServices {
  constructor(
    private readonly _eventEmitter: EventEmitter2,
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly _repository: RestaurantRepository,
  ) {}

  async getRestaurants() {
    return await this._repository.findMany();
  }

  async getRestaurantById(orgId: string) {
    return await this._getRestaurantById(orgId);
  }

  async setupRestaurant(payload: SetupRestaurantServicePayload) {
    const restaurant = withTransformUnknownErrorToAppError(() =>
      Restaurant.create({
        menuIds: [],
        stores: [],
        ...payload,
      }),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.create(restaurant);
    });
  }

  async createRestaurant(payload: CreateRestaurantServicePayload) {
    const restaurant = withTransformUnknownErrorToAppError(() =>
      Restaurant.create({
        menuIds: [],
        stores: [],
        ...payload,
      }),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.create(restaurant);
    });

    return restaurant.id;
  }

  async updateRestaurantById(
    restaurantId: string,
    payload: UpdateRestaurantServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() => restaurant.update(payload));

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async removeRestaurantById(restaurantId: string) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() => restaurant.remove());

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.remove(restaurant);
    });
  }

  async createStore(restaurantId: string, payload: CreateStoreServicePayload) {
    const restaurant = await this._getRestaurantById(restaurantId);
    const storeId = withTransformUnknownErrorToAppError(() =>
      restaurant.addStore({
        tables: [],
        ...payload,
      }),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });

    return storeId;
  }

  async updateStoreById(
    restaurantId: string,
    storeId: string,
    payload: UpdateStoreServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.updateStoreById(storeId, payload),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async removeStoreById(restaurantId: string, storeId: string) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.removeStoreById(storeId),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async createTable(
    restaurantId: string,
    storeId: string,
    payload: CreateTableServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    const tableId = withTransformUnknownErrorToAppError(() =>
      restaurant.addTable(storeId, payload),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });

    return tableId;
  }

  async updateTableById(
    restaurantId: string,
    storeId: string,
    tableId: string,
    payload: UpdateTableServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.updateTableById(storeId, tableId, payload),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async removeTableById(
    restaurantId: string,
    storeId: string,
    tableId: string,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.removeTableById(storeId, tableId),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  private async _getRestaurantById(id: string) {
    const result = await this._repository.findById(id);
    if (isNil(result)) throw new NotFoundError();
    return result;
  }
}
