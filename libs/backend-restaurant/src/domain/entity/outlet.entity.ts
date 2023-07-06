import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  DomainError,
  Entity,
  createEntityId,
} from '@resnity/backend-common';

import { MenuId, assertMenuIdsValid } from '../common/menu.types';
import { OrderId, assertOrderIdsValid } from '../common/order.types';
import { RestaurantErrorCode } from '../restaurant.errors';
import { Address } from '../value-object/address.value-object';
import { Contact } from '../value-object/contact.value-object';
import { ServiceSchedule } from '../value-object/service-schedule.value-object';
import {
  CreateOutletPayload,
  OutletId,
  OutletName,
  UpdateOutletPayload,
  assertOutletIdValid,
  assertOutletNameValid,
} from './outlet.entity.types';
import { Table } from './table.entity';
import {
  CreateTablePayload,
  TableId,
  UpdateTablePayload,
  assertTableIdValid,
} from './table.entity.types';

export class Outlet extends Entity<OutletId> {
  private _menuIds: MenuId[];
  private _orderIds: OrderId[];
  private _name: OutletName;
  private _tables: Table[];
  private _address: Address;
  private _contact: Contact;
  private _serviceSchedule: ServiceSchedule;

  static create(payload: CreateOutletPayload) {
    return Outlet.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateOutletPayload>) {
    assertOutletIdValid(payload.id);
    assertMenuIdsValid(payload.menuIds);
    assertOrderIdsValid(payload.orderIds);
    assertOutletNameValid(payload.name);

    const outlet = new Outlet();
    outlet.id = payload.id;
    outlet.menuIds = payload.menuIds;
    outlet.orderIds = payload.orderIds;
    outlet.name = payload.name;
    outlet.tables = payload.tables.map(Table.create);
    outlet.address = Address.create(payload.address);
    outlet.contact = Contact.create(payload.contact);
    outlet.serviceSchedule = ServiceSchedule.create(payload.serviceSchedule);
    return outlet;
  }

  update(payload: UpdateOutletPayload) {
    if (payload.menuIds) {
      assertMenuIdsValid(payload.menuIds);
      this.menuIds = payload.menuIds;
    }
    if (payload.orderIds) {
      assertOrderIdsValid(payload.orderIds);
      this.orderIds = payload.orderIds;
    }
    if (payload.name) {
      assertOutletNameValid(payload.name);
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
    this._setUpdatedAtToNow();
    return this._id;
  }

  addTable(payload: CreateTablePayload) {
    const table = Table.create(payload);
    this._tables.push(table);
    this._setUpdatedAtToNow();
    return table.id;
  }

  updateTableById(tableId: string, payload: UpdateTablePayload) {
    assertTableIdValid(tableId);
    const table = this._getTableById(tableId);
    table.update(payload);
    this._setUpdatedAtToNow();
  }

  removeTableById(tableId: string) {
    assertTableIdValid(tableId);
    this._getTableById(tableId);
    const indexToRemove = this._tables.findIndex(
      (table) => table.id === tableId,
    );
    this._tables.splice(indexToRemove, 1);
    this._setUpdatedAtToNow();
  }

  private _getTableById(tableId: TableId) {
    const result = this._tables.find((table) => table.id === tableId);
    if (result === undefined)
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_OUTLET_TABLE_DOES_NOT_EXISTS,
      );
    return result;
  }

  private _assertTableDoesNotExists(tableId: TableId) {
    if (this._tables.some((table) => table.id === tableId))
      throw DomainError.ofCode(
        RestaurantErrorCode.RESTAURANT_OUTLET_TABLE_ALREADY_EXISTS,
      );
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
  get name(): OutletName {
    return this._name;
  }
  set name(value: OutletName) {
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
