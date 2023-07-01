import { AutoMap } from '@automapper/classes';

import {
  AggregateRoot,
  BaseEntityPayload,
  DomainError,
  createEntityId,
  extractMapValues,
  mapClassInstancesToMapBy,
} from '@resnity/backend-common';

import { Outlet } from './entity/outlet.entity';
import { OutletId } from './entity/outlet.entity.types';
import {
  assertRestaurantId,
  assertRestaurantMenuId,
  assertRestaurantMenuIds,
  assertRestaurantName,
  assertRestaurantOutlets,
} from './restaurant.aggregate-root.assertions';
import {
  CreateRestaurantPayload,
  RestaurantId,
  RestaurantMenuId,
  RestaurantName,
  RestaurantOutlet,
} from './restaurant.aggregate-root.types';
import { RestaurantErrorCode } from './restaurant.errors';
import { RestaurantCreatedEvent } from './restaurant.events';

export class Restaurant extends AggregateRoot<RestaurantId> {
  private _menuIds: Set<RestaurantMenuId>;
  private _name: RestaurantName;
  private _outlets: Map<OutletId, RestaurantOutlet>;

  static create(payload: CreateRestaurantPayload) {
    const restaurant = Restaurant.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });

    restaurant._addEvent(
      new RestaurantCreatedEvent({
        aggregateId: restaurant.id,
        name: restaurant.name,
      }),
    );

    return restaurant;
  }

  static new(payload: BaseEntityPayload<CreateRestaurantPayload>) {
    assertRestaurantId(payload.id);
    assertRestaurantName(payload.name);
    assertRestaurantMenuIds(payload.menuIds);
    assertRestaurantOutlets(payload.outlets);

    const restaurant = new Restaurant();
    restaurant.id = payload.id;
    restaurant.createdAt = payload.createdAt;
    restaurant.updatedAt = payload.updatedAt;
    restaurant.name = payload.name;
    restaurant.menuIds = payload.menuIds;
    restaurant.outlets = payload.outlets;
    return restaurant;
  }

  addMenuId(menuId: string) {
    assertRestaurantMenuId(menuId);
    this._addMenuId(menuId);
    this._setUpdatedAtToNow();
  }

  private _addMenuId(menuId: RestaurantMenuId) {
    this._assertMenuIdDoesNotExists(menuId);
    this._menuIds.add(menuId);
  }

  private _assertMenuIdDoesNotExists(menuId: RestaurantMenuId) {
    if (this._menuIds.has(menuId))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_MENU_ALREADY_EXISTS,
      );
  }

  @AutoMap(() => [String])
  get menuIds(): RestaurantMenuId[] {
    return Array.from(this._menuIds);
  }
  set menuIds(value: RestaurantMenuId[]) {
    this._menuIds = new Set(value);
  }

  @AutoMap(() => String)
  get name(): RestaurantName {
    return this._name;
  }
  set name(value: RestaurantName) {
    this._name = value;
  }

  @AutoMap(() => [Outlet])
  get outlets(): RestaurantOutlet[] {
    return extractMapValues(this._outlets);
  }
  set outlets(value: RestaurantOutlet[]) {
    this._outlets = mapClassInstancesToMapBy(value, 'id');
  }
}
