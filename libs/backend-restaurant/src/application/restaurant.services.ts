import { Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as E from 'fp-ts/Either';

import {
  AppError,
  DomainError,
  defaultDomainPayloadValidationErrorHandler,
  withValidation,
} from '@resnity/backend-common';

import { Restaurant } from '../domain/restaurant.aggregate-root';
import { CreateRestaurantPayload } from '../domain/restaurant.aggregate-root.types';
import {
  RESTAURANT_REPOSITORY_TOKEN,
  RestaurantRepository,
} from '../infrastructure/restaurant.repository';
import { CreateRestaurantServicePayload } from './restaurant.services.types';

export const RESTAURANT_SERVICE_TOKEN = Symbol('RESTAURANT_SERVICE_TOKEN');

export interface RestaurantServices {
  getRestaurants(): Promise<Restaurant[]>;
  createRestaurant(payload: CreateRestaurantServicePayload): Promise<string>;
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
    return await this._repository.withTransaction(async () => {
      const restaurant = await this._createRestaurant({
        menuIds: [],
        name: payload.name,
        outlets: [],
      });
      await this._repository.create(restaurant);
      await restaurant.publishEvents(this._eventEmitter);
      return restaurant.id;
    });
  }

  private async _createRestaurant(payload: CreateRestaurantPayload) {
    try {
      return Restaurant.create(payload);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }
}
