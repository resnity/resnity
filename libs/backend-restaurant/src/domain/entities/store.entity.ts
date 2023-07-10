import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  DomainError,
  Entity,
  createEntityId,
  isNil,
} from '@resnity/backend-common';

import { RestaurantErrorCode } from '../restaurant.errors';
import { MenuId, assertMenuIdsValid } from '../shared/menu.types';
import { OrderId, assertOrderIdsValid } from '../shared/order.types';
import { Address } from '../value-objects/address.value-object';
import { Contact } from '../value-objects/contact.value-object';
import { ServiceSchedule } from '../value-objects/service-schedule.value-object';
import {
  CreateStorePayload,
  StoreId,
  StoreName,
  UpdateStorePayload,
  assertStoreIdValid,
  assertStoreNameValid,
} from './store.entity.types';
import { Table } from './table.entity';
import {
  CreateTablePayload,
  TableId,
  UpdateTablePayload,
  assertTableIdValid,
} from './table.entity.types';

export class Store extends Entity<StoreId> {
  private _menuIds: MenuId[];
  private _orderIds: OrderId[];
  private _name: StoreName;
  private _tables: Table[];
  private _address: Address;
  private _contact: Contact;
  private _serviceSchedule: ServiceSchedule;

  static create(payload: CreateStorePayload) {
    return Store.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateStorePayload>) {
    assertStoreIdValid(payload.id);
    assertMenuIdsValid(payload.menuIds);
    assertOrderIdsValid(payload.orderIds);
    assertStoreNameValid(payload.name);

    const store = new Store();
    store.id = payload.id;
    store.menuIds = payload.menuIds;
    store.orderIds = payload.orderIds;
    store.name = payload.name;
    store.tables = payload.tables.map(Table.create);
    store.address = Address.create(payload.address);
    store.contact = Contact.create(payload.contact);
    store.serviceSchedule = ServiceSchedule.create(payload.serviceSchedule);
    return store;
  }

  update(payload: UpdateStorePayload) {
    this._update(payload);
    this._setUpdatedAtToNow();
    return this._id;
  }

  addTable(payload: CreateTablePayload) {
    const tableId = this._addTable(payload);
    this._setUpdatedAtToNow();
    return tableId;
  }

  updateTableById(tableId: string, payload: UpdateTablePayload) {
    assertTableIdValid(tableId);
    this._updateTableById(tableId, payload);
    this._setUpdatedAtToNow();
  }

  removeTableById(tableId: string) {
    assertTableIdValid(tableId);
    this._removeTableById(tableId);
    this._setUpdatedAtToNow();
  }

  private _update(payload: UpdateStorePayload) {
    if (payload.menuIds) {
      assertMenuIdsValid(payload.menuIds);
      this.menuIds = payload.menuIds;
    }
    if (payload.orderIds) {
      assertOrderIdsValid(payload.orderIds);
      this.orderIds = payload.orderIds;
    }
    if (payload.name) {
      assertStoreNameValid(payload.name);
      this.name = payload.name;
    }
    if (payload.address) {
      this.address = Address.create(payload.address);
    }
    if (payload.contact) {
      this.contact = Contact.create(payload.contact);
    }
    if (payload.serviceSchedule) {
      this.serviceSchedule = ServiceSchedule.create(payload.serviceSchedule);
    }
  }

  private _addTable(payload: CreateTablePayload) {
    const table = Table.create(payload);
    this._tables.push(table);
    return table.id;
  }

  private _updateTableById(tableId: TableId, payload: UpdateTablePayload) {
    const table = this._getTableById(tableId);
    if (isNil(table))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_STORE_TABLE_NOT_FOUND,
      );
    table.update(payload);
  }

  private _removeTableById(tableId: TableId) {
    const table = this._getTableById(tableId);
    if (isNil(table))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_STORE_TABLE_NOT_FOUND,
      );

    const indexToRemove = this._tables.findIndex(
      (table) => table.id === tableId,
    );
    this._tables.splice(indexToRemove, 1);
  }

  private _getTableById(tableId: TableId) {
    return this._tables.find((table) => table.id === tableId);
  }

  @AutoMap(() => [String])
  get menuIds(): MenuId[] {
    return this._menuIds;
  }
  set menuIds(value: MenuId[]) {
    this._menuIds = value;
  }

  @AutoMap(() => [String])
  get orderIds(): OrderId[] {
    return this._orderIds;
  }
  set orderIds(value: OrderId[]) {
    this._orderIds = value;
  }

  @AutoMap()
  get name(): StoreName {
    return this._name;
  }
  set name(value: StoreName) {
    this._name = value;
  }

  @AutoMap(() => [Table])
  get tables(): Table[] {
    return this._tables;
  }
  set tables(value: Table[]) {
    this._tables = value;
  }

  @AutoMap(() => Address)
  get address(): Address {
    return this._address;
  }
  set address(value: Address) {
    this._address = value;
  }

  @AutoMap(() => Contact)
  get contact(): Contact {
    return this._contact;
  }
  set contact(value: Contact) {
    this._contact = value;
  }

  @AutoMap(() => ServiceSchedule)
  get serviceSchedule(): ServiceSchedule {
    return this._serviceSchedule;
  }
  set serviceSchedule(value: ServiceSchedule) {
    this._serviceSchedule = value;
  }
}
