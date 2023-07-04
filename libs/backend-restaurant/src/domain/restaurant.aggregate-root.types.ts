import { z } from 'zod';

import {
  EntityId,
  Validate,
  domainSchemaValidatorBuilder,
} from '@resnity/backend-common';

const restaurantIdSchema = EntityId.brand<'RestaurantId'>();

const restaurantNameSchema = z
  .string()
  .min(2)
  .max(50)
  .brand<'RestaurantName'>();

export const assertRestaurantIdValid: Validate<typeof restaurantIdSchema> =
  domainSchemaValidatorBuilder(restaurantIdSchema);

export const assertRestaurantNameValid: Validate<typeof restaurantNameSchema> =
  domainSchemaValidatorBuilder(restaurantNameSchema);

export type RestaurantId = z.infer<typeof restaurantIdSchema>;

export type RestaurantName = z.infer<typeof restaurantNameSchema>;

export type CreateRestaurantPayload = {
  name: string;
  menuIds: string[];
};

export type UpdateRestaurantPayload = {
  menuIds?: string[];
  name?: string;
};
