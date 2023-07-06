import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  Entity,
  createEntityId,
} from '@resnity/backend-common';

import { Price } from '../value-objects/price.value-object';
import { ItemId, assertItemIdValid } from './item.entity.types';
import {
  CreateModifierPayload,
  ModifierId,
  ModifierIsRepeatable,
  ModifierMaxSelection,
  ModifierMinSelection,
  ModifierName,
  UpdateModifierPayload,
  assertModifierIdValid,
  assertModifierIsRepeatableValid,
  assertModifierMaxSelectionValid,
  assertModifierMinSelectionValid,
  assertModifierNameValid,
} from './modifier.entity.types';

export class Modifier extends Entity<ModifierId> {
  private _itemId: ItemId;
  private _name: ModifierName;
  private _minSelection: ModifierMinSelection;
  private _maxSelection: ModifierMaxSelection;
  private _isRepeatable: ModifierIsRepeatable;
  private _price: Price;

  static create(payload: CreateModifierPayload) {
    return Modifier.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateModifierPayload>) {
    assertModifierIdValid(payload.id);
    assertItemIdValid(payload.itemId);
    assertModifierNameValid(payload.name);
    assertModifierMinSelectionValid(payload.minSelection);
    assertModifierMaxSelectionValid(payload.maxSelection);
    assertModifierIsRepeatableValid(payload.isRepeatable);

    const modifier = new Modifier();
    modifier.id = payload.id;
    modifier.createdAt = payload.createdAt;
    modifier.updatedAt = payload.updatedAt;
    modifier.itemId = payload.itemId;
    modifier.name = payload.name;
    modifier.minSelection = payload.minSelection;
    modifier.maxSelection = payload.maxSelection;
    modifier.isRepeatable = payload.isRepeatable;
    modifier.price = Price.create(payload.price);
    return modifier;
  }

  update(payload: UpdateModifierPayload) {
    this._update(payload);
    this._setUpdatedAtToNow();
  }

  private _update(payload: UpdateModifierPayload) {
    if (payload.name) {
      assertModifierNameValid(payload.name);
      this.name = payload.name;
    }
    if (payload.minSelection) {
      assertModifierMinSelectionValid(payload.minSelection);
      this.minSelection = payload.minSelection;
    }
    if (payload.maxSelection) {
      assertModifierMaxSelectionValid(payload.maxSelection);
      this.maxSelection = payload.maxSelection;
    }
    if (payload.isRepeatable) {
      assertModifierIsRepeatableValid(payload.isRepeatable);
      this.isRepeatable = payload.isRepeatable;
    }
    if (payload.price) {
      this.price = Price.create(payload.price);
    }
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
  get price(): Price {
    return this._price;
  }
  set price(value: Price) {
    this._price = value;
  }
}
