import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  Entity,
  createEntityId,
  extractMapValues,
  mapClassInstancesToMapBy,
} from '@resnity/backend-common';

import { Address } from '../value-object/address.value-object';
import { Contact } from '../value-object/contact.value-object';
import { ServiceSchedule } from '../value-object/service-schedule.value-object';
import {
  assertOutletAddress,
  assertOutletContact,
  assertOutletId,
  assertOutletMenuIds,
  assertOutletName,
  assertOutletOrderIds,
  assertOutletServiceSchedule,
  assertOutletTables,
} from './outlet.entity.assertions';
import {
  CreateOutletPayload,
  OutletAddress,
  OutletContact,
  OutletId,
  OutletMenuId,
  OutletName,
  OutletOrderId,
  OutletServiceSchedule,
  OutletTable,
} from './outlet.entity.types';
import { Table } from './table.entity';
import { TableId } from './table.entity.types';

export class Outlet extends Entity<OutletId> {
  private _menuIds: Set<OutletMenuId>;
  private _orderIds: Set<OutletOrderId>;
  private _name: OutletName;
  private _tables: Map<TableId, OutletTable>;
  private _address: OutletAddress;
  private _contact: OutletContact;
  private _serviceSchedule: OutletServiceSchedule;

  static create(payload: CreateOutletPayload) {
    return Outlet.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateOutletPayload>) {
    assertOutletId(payload.id);
    assertOutletMenuIds(payload.menuIds);
    assertOutletOrderIds(payload.orderIds);
    assertOutletName(payload.name);
    assertOutletTables(payload.tables);
    assertOutletAddress(payload.address);
    assertOutletContact(payload.contact);
    assertOutletServiceSchedule(payload.serviceSchedule);

    const outlet = new Outlet();
    outlet.id = payload.id;
    outlet.menuIds = payload.menuIds;
    outlet.orderIds = payload.orderIds;
    outlet.name = payload.name;
    outlet.tables = payload.tables;
    outlet.address = payload.address;
    outlet.contact = payload.contact;
    outlet.serviceSchedule = payload.serviceSchedule;
    return outlet;
  }

  @AutoMap(() => [String])
  get menuIds(): OutletMenuId[] {
    return Array.from(this._menuIds);
  }
  set menuIds(value: OutletMenuId[]) {
    this._menuIds = new Set(value);
  }

  @AutoMap(() => [String])
  get orderIds(): OutletOrderId[] {
    return Array.from(this._orderIds);
  }
  set orderIds(value: OutletOrderId[]) {
    this._orderIds = new Set(value);
  }

  @AutoMap()
  get name(): OutletName {
    return this._name;
  }
  set name(value: OutletName) {
    this._name = value;
  }

  @AutoMap(() => [Table])
  get tables(): OutletTable[] {
    return extractMapValues(this._tables);
  }
  set tables(value: OutletTable[]) {
    this._tables = mapClassInstancesToMapBy(value, 'id');
  }

  @AutoMap(() => Address)
  get address(): OutletAddress {
    return this._address;
  }
  set address(value: OutletAddress) {
    this._address = value;
  }

  @AutoMap(() => Contact)
  get contact(): OutletContact {
    return this._contact;
  }
  set contact(value: OutletContact) {
    this._contact = value;
  }

  @AutoMap(() => ServiceSchedule)
  get serviceSchedule(): OutletServiceSchedule {
    return this._serviceSchedule;
  }
  set serviceSchedule(value: OutletServiceSchedule) {
    this._serviceSchedule = value;
  }
}
