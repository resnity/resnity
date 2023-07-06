import { Inject } from '@nestjs/common';

import {
  NotFoundError,
  withTransformUnknownErrorToAppError,
} from '@resnity/backend-common';

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
    withTransformUnknownErrorToAppError(() =>
      restaurant.addMenu(payload.menuId),
    );
    await this._repository.update(restaurant);
  }

  private async _getRestaurantById(id: string) {
    const result = await this._repository.findById(id);
    if (result === undefined) throw new NotFoundError();
    return result;
  }
}
