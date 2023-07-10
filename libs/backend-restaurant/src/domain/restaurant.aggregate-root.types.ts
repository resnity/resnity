import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

import { CreateStorePayload } from './entities/store.entity.types';

const restaurantIdSchema = EntityId.brand<'RestaurantId'>();

const restaurantNameSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'RestaurantName'>();

const restaurantDisplayNameSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'RestaurantDisplayName'>();
const maybeRestaurantDisplayNameSchema = restaurantDisplayNameSchema.optional();

export const assertRestaurantIdValid: Validate<typeof restaurantIdSchema> =
  domainSchemaValidatorBuilder(restaurantIdSchema);

export const assertRestaurantNameValid: Validate<typeof restaurantNameSchema> =
  domainSchemaValidatorBuilder(restaurantNameSchema);

export const assertMaybeRestaurantDisplayNameValid: Validate<
  typeof maybeRestaurantDisplayNameSchema
> = domainSchemaValidatorBuilder(maybeRestaurantDisplayNameSchema);

export type RestaurantId = z.infer<typeof restaurantIdSchema>;

export type RestaurantName = z.infer<typeof restaurantNameSchema>;

export type RestaurantDisplayName = z.infer<typeof restaurantDisplayNameSchema>;

export type CreateRestaurantPayload = {
  menuIds: string[];
  name: string;
  displayName?: string;
  stores: CreateStorePayload[];
};

export type UpdateRestaurantPayload = {
  menuIds?: string[];
  name?: string;
  displayName?: string;
};
