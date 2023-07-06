import { Inject } from '@nestjs/common';

import { AppError, DomainError, NotFoundError } from '@resnity/backend-common';

import { Restaurant } from '../domain/restaurant.aggregate-root';
import {
  RESTAURANT_REPOSITORY_TOKEN,
  RestaurantRepository,
} from '../infrastructure/restaurant.repository';
import { MenuCreatedEventHandlerPayload } from './restaurant.event-handlers.types';

export const RESTAURANT_EVENT_HANDLERS_TOKEN = Symbol(
  'RESTAURANT_EVENT_HANDLERS_TOKEN',
);

export interface RestaurantEventHandlers {
  menuCreated: (payload: MenuCreatedEventHandlerPayload) => Promise<void>;
}

export class RestaurantEventHandlersImpl implements RestaurantEventHandlers {
  constructor(
    @Inject(RESTAURANT_REPOSITORY_TOKEN)
    private readonly _repository: RestaurantRepository,
  ) {}

  async menuCreated(payload: MenuCreatedEventHandlerPayload) {
    const restaurant = await this._getRestaurantById(payload.restaurantId);
    this._addMenu(restaurant, payload.menuId);
    await this._repository.update(restaurant);
  }

  private async _getRestaurantById(id: string) {
    const result = await this._repository.findById(id);
    if (result === undefined) throw new NotFoundError();
    return result;
  }

  private _addMenu(restaurant: Restaurant, menuId: string) {
    try {
      restaurant.addMenu(menuId);
    } catch (err) {
      throw AppError.fromDomain(err as DomainError);
    }
  }
}
