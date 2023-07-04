import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  Entity,
  createEntityId,
} from '@resnity/backend-common';

import {
  CreateTablePayload,
  TableCapacity,
  TableCode,
  TableId,
  UpdateTablePayload,
  assertTableCapacityValid,
  assertTableCodeValid,
  assertTableIdValid,
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
    assertTableIdValid(payload.id);
    assertTableCodeValid(payload.code);
    assertTableCapacityValid(payload.capacity);

    const table = new Table();
    table.createdAt = payload.createdAt;
    table.updatedAt = payload.updatedAt;
    table.id = payload.id;
    table.code = payload.code;
    table.capacity = payload.capacity;
    return table;
  }

  update(payload: UpdateTablePayload) {
    if (payload.code) {
      assertTableCodeValid(payload.code);
      this.code = payload.code;
    }
    if (payload.capacity) {
      assertTableCapacityValid(payload.capacity);
      this.capacity = payload.capacity;
    }
    this._setUpdatedAtToNow();
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
