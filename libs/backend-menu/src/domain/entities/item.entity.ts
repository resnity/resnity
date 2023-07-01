import { AutoMap } from '@automapper/classes';

import {
  BaseEntityPayload,
  Entity,
  createEntityId,
  extractMapValues,
  mapClassInstancesToMapBy,
} from '@resnity/backend-common';

import { Image } from '../value-objects/image.value-object';
import { ImageUrl } from '../value-objects/image.value-object.types';
import { Price } from '../value-objects/price.value-object';
import {
  assertItemId,
  assertItemImages,
  assertItemModifierIds,
  assertItemName,
  assertItemPrice,
} from './item.entity.assertions';
import {
  CreateItemPayload,
  ItemId,
  ItemImage,
  ItemModifierId,
  ItemName,
  ItemPrice,
  UpdateItemPayload,
} from './item.entity.types';

export class Item extends Entity<ItemId> {
  private _modifierIds: Set<ItemModifierId>;
  private _name: ItemName;
  private _price: ItemPrice;
  private _images: Map<ImageUrl, ItemImage>;

  static create(payload: CreateItemPayload) {
    return Item.new({
      id: createEntityId(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...payload,
    });
  }

  static new(payload: BaseEntityPayload<CreateItemPayload>) {
    assertItemId(payload.id);
    assertItemModifierIds(payload.modifierIds);
    assertItemName(payload.name);
    assertItemPrice(payload.price);
    assertItemImages(payload.images);

    const item = new Item();
    item.id = payload.id;
    item.createdAt = payload.createdAt;
    item.updatedAt = payload.updatedAt;
    item.modifierIds = payload.modifierIds;
    item.name = payload.name;
    item.price = payload.price;
    item.images = payload.images;
    return item;
  }

  update(payload: UpdateItemPayload) {
    if (payload.modifierIds !== undefined) {
      assertItemModifierIds(payload.modifierIds);
      this._modifierIds = new Set(payload.modifierIds);
    }
    if (payload.name !== undefined) {
      assertItemName(payload.name);
      this._name = payload.name;
    }
    if (payload.price !== undefined) {
      assertItemPrice(payload.price);
      this._price = payload.price;
    }
    if (payload.images !== undefined) {
      assertItemImages(payload.images);
      this._images = mapClassInstancesToMapBy(payload.images, 'url');
    }
  }

  @AutoMap(() => [String])
  get modifierIds(): ItemModifierId[] {
    return Array.from(this._modifierIds);
  }
  set modifierIds(value: ItemModifierId[]) {
    this._modifierIds = new Set(value);
  }

  @AutoMap(() => String)
  get name(): ItemName {
    return this._name;
  }
  set name(value: ItemName) {
    this._name = value;
  }

  @AutoMap(() => Price)
  get price(): ItemPrice {
    return this._price;
  }
  set price(value: ItemPrice) {
    this._price = value;
  }

  @AutoMap(() => [Image])
  get images(): ItemImage[] {
    return extractMapValues(this._images);
  }
  set images(value: ItemImage[]) {
    this._images = mapClassInstancesToMapBy(value, 'url');
  }
}
