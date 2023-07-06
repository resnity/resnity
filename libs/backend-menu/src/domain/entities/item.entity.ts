import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  Entity,
  createEntityId,
} from '@resnity/backend-common';

import { Image } from '../value-objects/image.value-object';
import { Price } from '../value-objects/price.value-object';
import {
  CreateItemPayload,
  ItemId,
  ItemName,
  UpdateItemPayload,
  assertItemIdValid,
  assertItemNameValid,
} from './item.entity.types';
import { ModifierId, assertModifierIdsValid } from './modifier.entity.types';

export class Item extends Entity<ItemId> {
  private _modifierIds: ModifierId[];
  private _name: ItemName;
  private _price: Price;
  private _images: Image[];

  static create(payload: CreateItemPayload) {
    return Item.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateItemPayload>) {
    assertItemIdValid(payload.id);
    assertModifierIdsValid(payload.modifierIds);
    assertItemNameValid(payload.name);

    const item = new Item();
    item.id = payload.id;
    item.createdAt = payload.createdAt;
    item.updatedAt = payload.updatedAt;
    item.modifierIds = payload.modifierIds;
    item.name = payload.name;
    item.price = Price.create(payload.price);
    item.images = payload.images.map(Image.create);
    return item;
  }

  update(payload: UpdateItemPayload) {
    if (payload.modifierIds !== undefined) {
      assertModifierIdsValid(payload.modifierIds);
      this._modifierIds = payload.modifierIds;
    }
    if (payload.name !== undefined) {
      assertItemNameValid(payload.name);
      this._name = payload.name;
    }
    if (payload.price !== undefined) {
      this._price = Price.create(payload.price);
    }
    if (payload.images !== undefined) {
      this._images = payload.images.map(Image.create);
    }
  }

  @AutoMap(() => [String])
  get modifierIds(): ModifierId[] {
    return this._modifierIds;
  }
  set modifierIds(value: ModifierId[]) {
    this._modifierIds = value;
  }

  @AutoMap(() => String)
  get name(): ItemName {
    return this._name;
  }
  set name(value: ItemName) {
    this._name = value;
  }

  @AutoMap(() => Price)
  get price(): Price {
    return this._price;
  }
  set price(value: Price) {
    this._price = value;
  }

  @AutoMap(() => [Image])
  get images(): Image[] {
    return this._images;
  }
  set images(value: Image[]) {
    this._images = value;
  }
}
