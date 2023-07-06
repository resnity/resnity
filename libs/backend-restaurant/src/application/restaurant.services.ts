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
  CreateOutletServicePayload,
  CreateRestaurantServicePayload,
  CreateTableServicePayload,
  UpdateOutletServicePayload,
  UpdateRestaurantServicePayload,
  UpdateTableServicePayload,
} from './restaurant.services.types';

export const RESTAURANT_SERVICE_TOKEN = Symbol('RESTAURANT_SERVICE_TOKEN');

export interface RestaurantServices {
  getRestaurants(): Promise<Restaurant[]>;

  createRestaurant(payload: CreateRestaurantServicePayload): Promise<string>;
  updateRestaurantById(
    restaurantId: string,
    payload: UpdateRestaurantServicePayload,
  ): Promise<void>;
  removeRestaurantById(restaurantId: string): Promise<void>;

  createOutlet(
    restaurantId: string,
    payload: CreateOutletServicePayload,
  ): Promise<string>;
  updateOutletById(
    restaurantId: string,
    outletId: string,
    payload: UpdateOutletServicePayload,
  ): Promise<void>;
  removeOutletById(restaurantId: string, outletId: string): Promise<void>;

  createTable(
    restaurantId: string,
    outletId: string,
    payload: CreateTableServicePayload,
  ): Promise<string>;
  updateTableById(
    restaurantId: string,
    outletId: string,
    tableId: string,
    payload: UpdateTableServicePayload,
  ): Promise<void>;
  removeTableById(
    restaurantId: string,
    outletId: string,
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

  async createRestaurant(payload: CreateRestaurantServicePayload) {
    const restaurant = withTransformUnknownErrorToAppError(() =>
      Restaurant.create({
        menuIds: [],
        outlets: [],
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

  async createOutlet(
    restaurantId: string,
    payload: CreateOutletServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    const outletId = withTransformUnknownErrorToAppError(() =>
      restaurant.addOutlet({
        tables: [],
        ...payload,
      }),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });

    return outletId;
  }

  async updateOutletById(
    restaurantId: string,
    outletId: string,
    payload: UpdateOutletServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.updateOutletById(outletId, payload),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async removeOutletById(restaurantId: string, outletId: string) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.removeOutletById(outletId),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async createTable(
    restaurantId: string,
    outletId: string,
    payload: CreateTableServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    const tableId = withTransformUnknownErrorToAppError(() =>
      restaurant.addTable(outletId, payload),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });

    return tableId;
  }

  async updateTableById(
    restaurantId: string,
    outletId: string,
    tableId: string,
    payload: UpdateTableServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.updateTableById(outletId, tableId, payload),
    );

    await this._repository.withTransaction(async () => {
      await restaurant.publishEvents(this._eventEmitter);
      await this._repository.update(restaurant);
    });
  }

  async removeTableById(
    restaurantId: string,
    outletId: string,
    tableId: string,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    withTransformUnknownErrorToAppError(() =>
      restaurant.removeTableById(outletId, tableId),
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
