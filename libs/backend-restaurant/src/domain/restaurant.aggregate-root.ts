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
import {
  OutletId,
  UpdateOutletPayload,
  assertOutletIdValid,
} from './entity/outlet.entity.types';
import {
  CreateRestaurantPayload,
  RestaurantId,
  RestaurantMenuId,
  RestaurantName,
  RestaurantOutlet,
  UpdateRestaurantPayload,
  assertRestaurantIdValid,
  assertRestaurantMenuIdValid,
  assertRestaurantMenuIdsValid,
  assertRestaurantNameValid,
  assertRestaurantOutletValid,
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
    assertRestaurantIdValid(payload.id);
    assertRestaurantNameValid(payload.name);
    assertRestaurantMenuIdsValid(payload.menuIds);

    const restaurant = new Restaurant();
    restaurant.id = payload.id;
    restaurant.createdAt = payload.createdAt;
    restaurant.updatedAt = payload.updatedAt;
    restaurant.name = payload.name;
    restaurant.menuIds = payload.menuIds;
    restaurant.outlets = [];
    return restaurant;
  }

  update(payload: UpdateRestaurantPayload) {
    if (payload.menuIds !== undefined) {
      assertRestaurantMenuIdsValid(payload.menuIds);
      this._menuIds = new Set(payload.menuIds);
    }
    if (payload.name !== undefined) {
      assertRestaurantNameValid(payload.name);
      this._name = payload.name;
    }
    this._setUpdatedAtToNow();
  }

  remove() {
    // publish event
  }

  addMenuId(menuId: string) {
    assertRestaurantMenuIdValid(menuId);
    this._assertMenuDoesNotExists(menuId);
    this._menuIds.add(menuId);
    this._setUpdatedAtToNow();
  }

  addOutlet(outlet: Outlet) {
    assertRestaurantOutletValid(outlet);
    this._assertOutletDoesNotExists(outlet);
    this._outlets.set(outlet.id, outlet);
    this._setUpdatedAtToNow();
  }

  updateOutletById(outletId: string, payload: UpdateOutletPayload) {
    assertOutletIdValid(outletId);
    const outlet = this._getOutletById(outletId);
    outlet.update(payload);
    this._setUpdatedAtToNow();
  }

  removeOutletById(outletId: string) {
    assertOutletIdValid(outletId);
    this._getOutletById(outletId);
    this._outlets.delete(outletId);
    this._setUpdatedAtToNow();
  }

  private _getOutletById(outletId: OutletId) {
    const outlet = this._outlets.get(outletId);
    if (outlet === undefined)
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_OUTLET_DOES_NOT_EXISTS,
      );
    return outlet;
  }

  private _assertMenuDoesNotExists(menuId: RestaurantMenuId) {
    if (this._menuIds.has(menuId))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_MENU_ALREADY_EXISTS,
      );
  }

  private _assertOutletDoesNotExists(outlet: Outlet) {
    if (this._outlets.has(outlet.id))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_OUTLET_ALREADY_EXISTS,
      );
  }

  private _assertOutletExists(outletId: OutletId) {
    if (!this._outlets.has(outletId))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_OUTLET_DOES_NOT_EXISTS,
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
