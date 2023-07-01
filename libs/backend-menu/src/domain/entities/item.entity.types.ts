import { z } from 'zod';

import { BaseEntityPayload, EntityId } from '@resnity/backend-common';

import { Image } from '../value-objects/image.value-object';
import { Price } from '../value-objects/price.value-object';
import { ModifierId } from './modifier.entity.types';

export const ItemId = EntityId.brand<'ItemId'>();
export type ItemId = z.infer<typeof ItemId>;

export const ItemName = z.string().min(2).max(50).brand<'ItemName'>();
export type ItemName = z.infer<typeof ItemName>;

export const ItemPrice = z.instanceof(Price).brand<'ItemPrice'>();
export type ItemPrice = z.infer<typeof ItemPrice>;

export const ItemImage = z.instanceof(Image).brand<'ItemImage'>();
export type ItemImage = z.infer<typeof ItemImage>;

export const ItemModifierId = ModifierId.brand<'ItemModifierId'>();
export type ItemModifierId = z.infer<typeof ItemModifierId>;

export type CreateItemPayload = {
  modifierIds: string[];
  name: string;
  price: Price;
  images: Image[];
};

export type UpdateItemPayload = {
  modifierIds?: string[];
  name?: string;
  price?: Price;
  images?: Image[];
};
