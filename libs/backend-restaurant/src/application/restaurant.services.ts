import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { AppError, DomainError, NotFoundError } from '@resnity/backend-common';

import { Restaurant } from '../domain/restaurant.aggregate-root';
import { CreateRestaurantPayload } from '../domain/restaurant.aggregate-root.types';
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
    return this._repository.findMany();
  }

  async createRestaurant(payload: CreateRestaurantServicePayload) {
    const restaurant = this._createRestaurant({
      menuIds: [],
      name: payload.name,
    });

    await this._repository.withTransaction(async () => {
      await this._repository.create(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });

    return restaurant.id;
  }

  async updateRestaurantById(
    restaurantId: string,
    payload: UpdateRestaurantServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    restaurant.update(payload);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });
  }

  async removeRestaurantById(restaurantId: string) {
    const restaurant = await this._getRestaurantById(restaurantId);
    restaurant.remove();

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
    const outletId = restaurant.addOutlet(payload);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });

    return outletId;
  }

  async updateOutletById(
    restaurantId: string,
    outletId: string,
    payload: UpdateOutletServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    restaurant.updateOutletById(outletId, payload);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });
  }

  async removeOutletById(restaurantId: string, outletId: string) {
    const restaurant = await this._getRestaurantById(restaurantId);
    restaurant.removeOutletById(outletId);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });
  }

  async createTable(
    restaurantId: string,
    outletId: string,
    payload: CreateTableServicePayload,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    const tableId = restaurant.addTable(outletId, payload);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
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
    restaurant.updateTableById(outletId, tableId, payload);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });
  }

  async removeTableById(
    restaurantId: string,
    outletId: string,
    tableId: string,
  ) {
    const restaurant = await this._getRestaurantById(restaurantId);
    restaurant.removeTableById(outletId, tableId);

    await this._repository.withTransaction(async () => {
      await this._repository.update(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
    });
  }

  private async _getRestaurantById(id: string) {
    const result = await this._repository.findById(id);
    if (result === null) throw new NotFoundError();
    return result;
  }

  private _createRestaurant(payload: CreateRestaurantPayload) {
    try {
      return Restaurant.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }
}
