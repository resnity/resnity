import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateImagePayload } from '../value-objects/image.value-object.types';
import { CreatePricePayload } from '../value-objects/price.value-object.types';

const itemIdSchema = EntityId.brand<'ItemId'>();
const itemIdsSchema = itemIdSchema.array();

const itemNameSchema = z.string().min(2).max(50).brand<'ItemName'>();

export const assertItemIdValid: Validate<typeof itemIdSchema> =
  domainSchemaValidatorBuilder(itemIdSchema);
export const assertItemIdsValid: Validate<typeof itemIdsSchema> =
  domainSchemaValidatorBuilder(itemIdsSchema);

export const assertItemNameValid: Validate<typeof itemNameSchema> =
  domainSchemaValidatorBuilder(itemNameSchema);

export type ItemId = z.infer<typeof itemIdSchema>;

export type ItemName = z.infer<typeof itemNameSchema>;

export type CreateItemPayload = {
  modifierIds: string[];
  name: string;
  price: CreatePricePayload;
  images: CreateImagePayload[];
};

export type UpdateItemPayload = {
  modifierIds?: string[];
  name?: string;
  price?: CreatePricePayload;
  images?: CreateImagePayload[];
};
