import { validateOrThrowDomainError } from '@resnity/backend-common';

import { Image } from '../value-objects/image.value-object';
import { Price } from '../value-objects/price.value-object';
import {
  ItemId,
  ItemImage,
  ItemModifierId,
  ItemName,
  ItemPrice,
} from './item.entity.types';

type AssertItemId = (id: string) => asserts id is ItemId;
export const assertItemId: AssertItemId = (id: string) =>
  validateOrThrowDomainError(ItemId, id);

type AssertItemModifierIds = (
  modifierIds: string[],
) => asserts modifierIds is ItemModifierId[];
export const assertItemModifierIds: AssertItemModifierIds = (
  modifierIds: string[],
) => validateOrThrowDomainError(ItemModifierId.array(), modifierIds);

type AssertItemName = (name: string) => asserts name is ItemName;
export const assertItemName: AssertItemName = (name: string) =>
  validateOrThrowDomainError(ItemName, name);

type AssertItemPrice = (price: Price) => asserts price is ItemPrice;
export const assertItemPrice: AssertItemPrice = (price: Price) =>
  validateOrThrowDomainError(ItemPrice, price);

type AssertItemImages = (images: Image[]) => asserts images is ItemImage[];
export const assertItemImages: AssertItemImages = (images: Image[]) =>
  validateOrThrowDomainError(ItemImage.array(), images);
