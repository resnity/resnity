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
  CreateOutletPayload,
  OutletAddress,
  OutletContact,
  OutletId,
  OutletMenuId,
  OutletName,
  OutletOrderId,
  OutletServiceSchedule,
  OutletTable,
  UpdateOutletPayload,
  assertOutletAddressValid,
  assertOutletContactValid,
  assertOutletIdValid,
  assertOutletMenuIdsValid,
  assertOutletNameValid,
  assertOutletOrderIdsValid,
  assertOutletServiceScheduleValid,
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
    assertOutletIdValid(payload.id);
    assertOutletMenuIdsValid(payload.menuIds);
    assertOutletOrderIdsValid(payload.orderIds);
    assertOutletNameValid(payload.name);
    assertOutletAddressValid(payload.address);
    assertOutletContactValid(payload.contact);
    assertOutletServiceScheduleValid(payload.serviceSchedule);

    const outlet = new Outlet();
    outlet.id = payload.id;
    outlet.menuIds = payload.menuIds;
    outlet.orderIds = payload.orderIds;
    outlet.name = payload.name;
    outlet.tables = [];
    outlet.address = payload.address;
    outlet.contact = payload.contact;
    outlet.serviceSchedule = payload.serviceSchedule;
    return outlet;
  }

  update(payload: UpdateOutletPayload) {
    if (payload.menuIds) {
      assertOutletMenuIdsValid(payload.menuIds);
      this.menuIds = payload.menuIds;
    }
    if (payload.orderIds) {
      assertOutletOrderIdsValid(payload.orderIds);
      this.orderIds = payload.orderIds;
    }
    if (payload.name) {
      assertOutletNameValid(payload.name);
      this.name = payload.name;
    }
    if (payload.address) {
      assertOutletAddressValid(payload.address);
      this.address = payload.address;
    }
    if (payload.contact) {
      assertOutletContactValid(payload.contact);
      this.contact = payload.contact;
    }
    if (payload.serviceSchedule) {
      assertOutletServiceScheduleValid(payload.serviceSchedule);
      this.serviceSchedule = payload.serviceSchedule;
    }

    this._setUpdatedAtToNow();
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
