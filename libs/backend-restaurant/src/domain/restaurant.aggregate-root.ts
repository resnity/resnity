import { AutoMap } from '@automapper/classes';

import {
  AggregateRoot,
  BaseEntityPayload,
  DomainError,
  MaybeBaseEntityPayload,
  createEntityId,
  isNil,
} from '@resnity/backend-common';

import { Store } from './entities/store.entity';
import {
  CreateStorePayload,
  StoreId,
  UpdateStorePayload,
  assertStoreIdValid,
} from './entities/store.entity.types';
import {
  CreateTablePayload,
  TableId,
  UpdateTablePayload,
  assertTableIdValid,
} from './entities/table.entity.types';
import {
  CreateRestaurantPayload,
  RestaurantDisplayName,
  RestaurantId,
  RestaurantName,
  UpdateRestaurantPayload,
  assertMaybeRestaurantDisplayNameValid,
  assertRestaurantIdValid,
  assertRestaurantNameValid,
} from './restaurant.aggregate-root.types';
import { RestaurantErrorCode } from './restaurant.errors';
import {
  RestaurantCreatedEvent,
  RestaurantRemovedEvent,
} from './restaurant.events';
import {
  MenuId,
  assertMenuIdValid,
  assertMenuIdsValid,
} from './shared/menu.types';

export class Restaurant extends AggregateRoot<RestaurantId> {
  private _menuIds: MenuId[];
  private _name: RestaurantName;
  private _displayName?: RestaurantDisplayName;
  private _stores: Store[];

  static create(payload: MaybeBaseEntityPayload<CreateRestaurantPayload>) {
    const restaurant = Restaurant.new({
      id: payload.id ?? createEntityId(),
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
    assertMaybeRestaurantDisplayNameValid(payload.displayName);
    assertMenuIdsValid(payload.menuIds);

    const restaurant = new Restaurant();
    restaurant.id = payload.id;
    restaurant.createdAt = payload.createdAt;
    restaurant.updatedAt = payload.updatedAt;
    restaurant.name = payload.name;
    restaurant.displayName = payload.displayName;
    restaurant.menuIds = payload.menuIds;
    restaurant.stores = payload.stores.map(Store.create);
    return restaurant;
  }

  update(payload: UpdateRestaurantPayload) {
    if (!isNil(payload.menuIds)) {
      assertMenuIdsValid(payload.menuIds);
      this._menuIds = payload.menuIds;
    }
    if (!isNil(payload.name)) {
      assertRestaurantNameValid(payload.name);
      this._name = payload.name;
    }
    if (!isNil(payload.displayName)) {
      assertMaybeRestaurantDisplayNameValid(payload.displayName);
      this._displayName = payload.displayName;
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

  addStore(payload: CreateStorePayload) {
    const store = Store.create(payload);
    this._stores.push(store);
    this._setUpdatedAtToNow();
    return store.id;
  }

  updateStoreById(storeId: string, payload: UpdateStorePayload) {
    assertStoreIdValid(storeId);
    this._updateStoreById(storeId, payload);
    this._setUpdatedAtToNow();
  }

  removeStoreById(storeId: string) {
    assertStoreIdValid(storeId);
    this._removeStoreById(storeId);
    this._setUpdatedAtToNow();
  }

  addTable(storeId: string, payload: CreateTablePayload) {
    assertStoreIdValid(storeId);
    const tableId = this._addTable(storeId, payload);
    this._setUpdatedAtToNow();
    return tableId;
  }

  updateTableById(
    storeId: string,
    tableId: string,
    payload: UpdateTablePayload,
  ) {
    assertStoreIdValid(storeId);
    assertTableIdValid(tableId);
    this._updateTableById(storeId, tableId, payload);
    this._setUpdatedAtToNow();
  }

  removeTableById(storeId: string, tableId: string) {
    assertStoreIdValid(storeId);
    this._removeTableById(storeId, tableId);
    this._setUpdatedAtToNow();
  }

  private _addMenu(menuId: MenuId) {
    if (this._menuIds.includes(menuId))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_MENU_ALREADY_EXISTS,
      );
    this._menuIds.push(menuId);
  }

  private _updateStoreById(storeId: StoreId, payload: UpdateStorePayload) {
    const store = this._getStoreById(storeId);
    if (isNil(store))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_STORE_NOT_FOUND);
    store.update(payload);
  }

  private _removeStoreById(storeId: StoreId) {
    const store = this._getStoreById(storeId);
    if (isNil(store))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_STORE_NOT_FOUND);

    const indexToRemove = this._stores.findIndex(
      (store) => store.id === storeId,
    );
    this._stores.splice(indexToRemove, 1);
  }

  private _addTable(storeId: StoreId, payload: CreateTablePayload) {
    const store = this._getStoreById(storeId);
    if (isNil(store))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_STORE_NOT_FOUND);
    return store.addTable(payload);
  }

  private _updateTableById(
    storeId: StoreId,
    tableId: TableId,
    payload: UpdateTablePayload,
  ) {
    const store = this._getStoreById(storeId);
    if (isNil(store))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_STORE_NOT_FOUND);
    store.updateTableById(tableId, payload);
  }

  private _removeTableById(storeId: StoreId, tableId: string) {
    const store = this._getStoreById(storeId);
    if (isNil(store))
      throw DomainError.ofCode(RestaurantErrorCode.RESTAURANT_STORE_NOT_FOUND);
    store.removeTableById(tableId);
  }

  private _getStoreById(storeId: StoreId) {
    return this._stores.find((store) => store.id === storeId);
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

  @AutoMap(() => String)
  get displayName(): RestaurantDisplayName | undefined {
    return this._displayName;
  }
  set displayName(value: RestaurantDisplayName | undefined) {
    this._displayName = value;
  }

  @AutoMap(() => [Store])
  get stores(): Store[] {
    return this._stores;
  }
  set stores(value: Store[]) {
    this._stores = value;
  }
}
