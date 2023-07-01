import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { MenuCreatedDomainEvent } from '@resnity/backend-menu';

import {
  RESTAURANT_EVENT_HANDLERS_TOKEN,
  RestaurantEventHandlers,
} from '../application/restaurant.event-handlers';


@Injectable()
export class RestaurantEventListener {
  constructor(
    @Inject(RESTAURANT_EVENT_HANDLERS_TOKEN)
    private readonly _eventHandlers: RestaurantEventHandlers,
  ) {}

  @OnEvent(MenuCreatedDomainEvent.name, { async: true, promisify: true })
  async menuCreated(payload: MenuCreatedDomainEvent) {
    await this._eventHandlers.menuCreated({
      menuId: payload.aggregateId,
      restaurantId: payload.restaurantId,
    });
  }
}
