import { AutoMap } from '@automapper/classes';

import {
  AggregateRoot,
  BaseEntityPayload,
  DomainError,
  createEntityId,
  isNil,
} from '@resnity/backend-common';

import {
  MenuId,
  assertMenuIdValid,
  assertMenuIdsValid,
} from './common/menu.types';
import { Outlet } from './entity/outlet.entity';
import {
  CreateOutletPayload,
  OutletId,
  UpdateOutletPayload,
  assertOutletIdValid,
} from './entity/outlet.entity.types';
import {
  CreateTablePayload,
  TableId,
  UpdateTablePayload,
  assertTableIdValid,
} from './entity/table.entity.types';
import {
  CreateRestaurantPayload,
  RestaurantId,
  RestaurantName,
  UpdateRestaurantPayload,
  assertRestaurantIdValid,
  assertRestaurantNameValid,
} from './restaurant.aggregate-root.types';
import { RestaurantErrorCode } from './restaurant.errors';
import {
  RestaurantCreatedEvent,
  RestaurantRemovedEvent,
} from './restaurant.events';

export class Restaurant extends AggregateRoot<RestaurantId> {
  private _menuIds: MenuId[];
  private _name: RestaurantName;
  private _outlets: Outlet[];

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
    assertMenuIdsValid(payload.menuIds);

    const restaurant = new Restaurant();
    restaurant.id = payload.id;
    restaurant.createdAt = payload.createdAt;
    restaurant.updatedAt = payload.updatedAt;
    restaurant.name = payload.name;
    restaurant.menuIds = payload.menuIds;
    restaurant.outlets = payload.outlets.map(Outlet.create);
    return restaurant;
  }

  update(payload: UpdateRestaurantPayload) {
    if (payload.menuIds !== undefined) {
      assertMenuIdsValid(payload.menuIds);
      this._menuIds = payload.menuIds;
    }
    if (payload.name !== undefined) {
      assertRestaurantNameValid(payload.name);
      this._name = payload.name;
    }
    this._setUpdatedAtToNow();
  }

  remove() {
    this._addEvent(new RestaurantRemovedEvent({ aggregateId: this.id }));
    return this.id;
  }

  addMenu(menuId: string) {
    assertMenuIdValid(menuId);
    this._addMenu(menuId);
    this._setUpdatedAtToNow();
  }

  addOutlet(payload: CreateOutletPayload) {
    const outlet = Outlet.create(payload);
    this._outlets.push(outlet);
    this._setUpdatedAtToNow();
    return outlet.id;
  }

  updateOutletById(outletId: string, payload: UpdateOutletPayload) {
    assertOutletIdValid(outletId);
    this._updateOutletById(outletId, payload);
    this._setUpdatedAtToNow();
  }

  removeOutletById(outletId: string) {
    assertOutletIdValid(outletId);
    this._removeOutletById(outletId);
    this._setUpdatedAtToNow();
  }

  addTable(outletId: string, payload: CreateTablePayload) {
    assertOutletIdValid(outletId);
    const tableId = this._addTable(outletId, payload);
    this._setUpdatedAtToNow();
    return tableId;
  }

  updateTableById(
    outletId: string,
    tableId: string,
    payload: UpdateTablePayload,
  ) {
    assertOutletIdValid(outletId);
    assertTableIdValid(tableId);
    this._updateTableById(outletId, tableId, payload);
    this._setUpdatedAtToNow();
  }

  removeTableById(outletId: string, tableId: string) {
    assertOutletIdValid(outletId);
    this._removeTableById(outletId, tableId);
    this._setUpdatedAtToNow();
  }

  private _addMenu(menuId: MenuId) {
    if (this._menuIds.includes(menuId))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_MENU_ALREADY_EXISTS,
      );
    this._menuIds.push(menuId);
  }

  private _updateOutletById(outletId: OutletId, payload: UpdateOutletPayload) {
    const outlet = this._getOutletById(outletId);
    if (isNil(outlet))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_OUTLET_NOT_FOUND);
    outlet.update(payload);
  }

  private _removeOutletById(outletId: OutletId) {
    const outlet = this._getOutletById(outletId);
    if (isNil(outlet))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_OUTLET_NOT_FOUND);

    const indexToRemove = this._outlets.findIndex(
      (outlet) => outlet.id === outletId,
    );
    this._outlets.splice(indexToRemove, 1);
  }

  private _addTable(outletId: OutletId, payload: CreateTablePayload) {
    const outlet = this._getOutletById(outletId);
    if (isNil(outlet))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_OUTLET_NOT_FOUND);
    return outlet.addTable(payload);
  }

  private _updateTableById(
    outletId: OutletId,
    tableId: TableId,
    payload: UpdateTablePayload,
  ) {
    const outlet = this._getOutletById(outletId);
    if (isNil(outlet))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_OUTLET_NOT_FOUND);
    outlet.updateTableById(tableId, payload);
  }

  private _removeTableById(outletId: OutletId, tableId: string) {
    const outlet = this._getOutletById(outletId);
    if (isNil(outlet))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_OUTLET_NOT_FOUND);
    outlet.removeTableById(tableId);
  }

  private _getOutletById(outletId: OutletId) {
    return this._outlets.find((outlet) => outlet.id === outletId);
  }

  @AutoMap(() => [String])
  get menuIds(): MenuId[] {
    return this._menuIds;
  }
  set menuIds(value: MenuId[]) {
    this._menuIds = value;
  }

  @AutoMap(() => String)
  get name(): RestaurantName {
    return this._name;
  }
  set name(value: RestaurantName) {
    this._name = value;
  }

  @AutoMap(() => [Outlet])
  get outlets(): Outlet[] {
    return this._outlets;
  }
  set outlets(value: Outlet[]) {
    this._outlets = value;
  }
}
