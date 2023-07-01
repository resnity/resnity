import { AutoMap } from '@automapper/classes';

import { Entity, createEntityId } from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import { assertItemId } from './item.entity.assertions';
import { ItemId } from './item.entity.types';
import {
  assertModifierId,
  assertModifierIsRepeatable,
  assertModifierMaxSelection,
  assertModifierMinSelection,
  assertModifierName,
  assertModifierPrice,
} from './modifier.entity.assertions';
import {
  CreateModifierPayload,
  ModifierId,
  ModifierIsRepeatable,
  ModifierMaxSelection,
  ModifierMinSelection,
  ModifierName,
  ModifierPrice,
  NewModifierPayload,
} from './modifier.entity.types';

export class Modifier extends Entity<ModifierId> {
  private _itemId: ItemId;
  private _name: ModifierName;
  private _minSelection: ModifierMinSelection;
  private _maxSelection: ModifierMaxSelection;
  private _isRepeatable: ModifierIsRepeatable;
  private _price: ModifierPrice;

  static create(payload: CreateModifierPayload) {
    return Modifier.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: NewModifierPayload) {
    assertModifierId(payload.id);
    assertItemId(payload.itemId);
    assertModifierName(payload.name);
    assertModifierMinSelection(payload.minSelection);
    assertModifierMaxSelection(payload.maxSelection);
    assertModifierIsRepeatable(payload.isRepeatable);
    assertModifierPrice(payload.price);

    const modifier = new Modifier();
    modifier.id = payload.id;
    modifier.createdAt = payload.createdAt;
    modifier.updatedAt = payload.updatedAt;
    modifier.itemId = payload.itemId;
    modifier.name = payload.name;
    modifier.minSelection = payload.minSelection;
    modifier.maxSelection = payload.maxSelection;
    modifier.isRepeatable = payload.isRepeatable;
    modifier.price = payload.price;
    return modifier;
  }

  @AutoMap(() => String)
  get itemId(): ItemId {
    return this._itemId;
  }
  set itemId(value: ItemId) {
    this._itemId = value;
  }

  @AutoMap(() => String)
  get name(): ModifierName {
    return this._name;
  }
  set name(value: ModifierName) {
    this._name = value;
  }

  @AutoMap(() => Number)
  get minSelection(): ModifierMinSelection {
    return this._minSelection;
  }
  set minSelection(value: ModifierMinSelection) {
    this._minSelection = value;
  }

  @AutoMap(() => Number)
  get maxSelection(): ModifierMaxSelection {
    return this._maxSelection;
  }
  set maxSelection(value: ModifierMaxSelection) {
    this._maxSelection = value;
  }

  @AutoMap(() => Boolean)
  get isRepeatable(): ModifierIsRepeatable {
    return this._isRepeatable;
  }
  set isRepeatable(value: ModifierIsRepeatable) {
    this._isRepeatable = value;
  }

  @AutoMap(() => Price)
  get price(): ModifierPrice {
    return this._price;
  }
  set price(value: ModifierPrice) {
    this._price = value;
  }
}
