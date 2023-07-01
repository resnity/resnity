import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  Entity,
  createEntityId,
} from '@resnity/backend-common';

import {
  assertTableCapacity,
  assertTableCode,
  assertTableId,
} from './table.entity.assertions';
import {
  CreateTablePayload,
  TableCapacity,
  TableCode,
  TableId,
} from './table.entity.types';

export class Table extends Entity<TableId> {
  private _code: TableCode;
  private _capacity: TableCapacity;

  static create(payload: CreateTablePayload) {
    return Table.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateTablePayload>) {
    assertTableId(payload.id);
    assertTableCode(payload.code);
    assertTableCapacity(payload.capacity);

    const table = new Table();
    table.createdAt = payload.createdAt;
    table.updatedAt = payload.updatedAt;
    table.id = payload.id;
    table.code = payload.code;
    table.capacity = payload.capacity;
    return table;
  }

  @AutoMap()
  get code(): TableCode {
    return this._code;
  }
  set code(value: TableCode) {
    this._code = value;
  }

  @AutoMap()
  get capacity(): TableCapacity {
    return this._capacity;
  }
  set capacity(value: TableCapacity) {
    this._capacity = value;
  }
}
